import { Request, Response, Router } from "express";
import authMiddleware, { assertIRequest } from "../../middlewares/auth.middleware";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../../serverConfig';
import axios from 'axios';
import IServices from "../../interfaces/services.interface";
import { StatusCodes } from "http-status-codes";
import logger from "../../loggerConfig";

class githubService implements IServices {
  readonly router = Router();
  public clientId = GITHUB_CLIENT_ID;
  public clientSecret = GITHUB_CLIENT_SECRET;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes (): void {
    this.router.get('/oauth-callback', authMiddleware,this.callBack);
    this.router.get('/getUser', authMiddleware, this.fetchUser);
  }

  private callBack = async (request: Request, response: Response): Promise<void> => {
    assertIRequest(request);
    logger.info("Github Callback")
    const user = request.user;
    const body = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: request.query.code
    };
    const opts = { headers: { accept: 'application/json' } };
    axios.post(`https://github.com/login/oauth/access_token`, body, opts).
      then(res => {
        const token = res.data['access_token'];
        user.set({githubToken: token});
        user.save();
      }).then(() => {
        response.json({ ok: 'close this page' });
        logger.info("Github Callback success")
      }).catch(err => {
        response.json({ message: err.message })
        logger.error("Github Callback err", err)
      });
      await user.save();
  }

  private getGithubUser = (array: Array<object>) => {
    return array.map((value: any) => {
      return {
        avatar_url: value['avatar_url'],
        login: value['login']
      }
    });
  }

  private fetchUser = async (request: Request, response: Response): Promise<void> => {
    assertIRequest(request);
    const { githubToken } = request.user;
    logger.info("Try fetching user", {service: "Github"})
    
    if (githubToken && request.user) {
      try {
        const res = await axios.get('https://api.github.com/user', {
          headers: { 
            'Authorization': `token ${githubToken}`
          }
        });
        const followers = await (await axios.get(res.data.followers_url)).data;
        const following_url = res.data.following_url.substring(0, res.data.following_url.length - 13);
        const following = await (await axios.get(following_url)).data;
        const followingRes = this.getGithubUser(following);
        const followersRes = this.getGithubUser(followers);
        const responseJson = {
          'followers': [...followersRes],
          'following': [...followingRes],
          'login': res.data.login,
          'avatar': res.data.avatar_url
        }
        response.status(StatusCodes.OK).json(responseJson);
        logger.info("fetching user successfull", {service: "Github"})
      } catch (err) {
        response.status(StatusCodes.BAD_REQUEST).send(err);
        logger.error("fetching err",  err, {service: "Github"})
      }
    } else {
      response.status(StatusCodes.BAD_REQUEST).send('User has no github token');
      logger.error("User has no github token", {service: "Github", method: "fetchUser"})
    }
  }
}

export default githubService;
