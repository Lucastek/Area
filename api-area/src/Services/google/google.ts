import { Router, Request, Response } from "express";
import { google } from "googleapis";
const { OAuth2Client } = require('google-auth-library')
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../../serverConfig';
import authMiddleware, { assertIRequest } from "../../middlewares/auth.middleware";
import IServices from "../../interfaces/services.interface";
import logger from "../../loggerConfig";
import { StatusCodes } from "http-status-codes";
const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

class googleService implements IServices {
  readonly router = Router();
  constructor() {
    logger.info("instantiation of google service")
    this.initializeRoutes();
  }

  private initializeRoutes (): void {
    this.router.get(`/chanel`, authMiddleware,this.getChannel);
  }

  private getChannel = async (request: Request, response: Response): Promise<void> => {
    assertIRequest(request);
    logger.info('try getChannel', {service: "Google"})
    const service = google.youtube('v3');
    const user = request.user;
    const googleToken = await user?.googleToken;
    logger.info('user', user, {service: "Google", method: "getChannel"})

    if (!googleToken || googleToken === '') {
      response.status(StatusCodes.BAD_REQUEST).send('User has no token, please post token before accessing this route');
      logger.error('User has no token, please post token before accessing this route', {service: "Google", method: "getChannel"})
      return;
    }
    client.setCredentials({access_token: googleToken});
    service.channels.list({
      auth: client,
      part: ['snippet, statistics'], //auditDetails, brandingSettings, contentDetails, contentOwnerDetails, localizations, status'],
      mine: true,
    }, function(err: any, res: any) {
      if (err) {
        logger.error('The API returned an error: ', err, { service: "Google", method: "getChannel"});
        response.status(StatusCodes.UNAUTHORIZED).send('The API returned an error: ' + err);
        return;
      }
      const channels = res.data.items;
      if (channels.length == 0) {
        logger.error('No channel found.', { service: "Google", method: "getChannel"});
        response.status(StatusCodes.UNAUTHORIZED).send('No channel found.');
      } else {
        const responseJson = {
          'viewCount': channels[0].statistics.viewCount,
          'suscriberCount': channels[0].statistics.subscriberCount,
          'videoCount': channels[0].statistics.videoCount,
          'chanelName': channels[0].snippet.title
        }
        response.status(StatusCodes.CREATED).json(responseJson);
      }
    });
  }
}

export default googleService;
