import FB, {FacebookApiException} from 'fb';
import { Request, Response, Router } from "express";
import authMiddleware, { assertIRequest } from "../../middlewares/auth.middleware";

import { FACEBOOK_CLIENT_ID } from '../../serverConfig';
import IServices from "../../interfaces/services.interface";

FB.options({version: 'v2.4'});
FB.extend({app_id: FACEBOOK_CLIENT_ID})

class facebookService implements IServices {
  readonly router = Router();
  constructor() {
    console.log("instantiation of google service")
    this.initializeRoutes();
  }

  private initializeRoutes (): void {
    this.router.get('/user', authMiddleware, this.getUser);
  }

  private getUser = async (request: Request, response: Response): Promise<void> => {
    assertIRequest(request);
    const user = request.user;
    const { facebookToken } = user;
    FB.api('me', 'get', { fields: 'id,name,friends,birthday,picture,likes', access_token: facebookToken }, function (res) {
      console.log(res);
      response.status(200).json(res);
  });

  }
}

export default facebookService;
