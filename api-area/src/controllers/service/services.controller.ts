import IServices from '../../interfaces/services.interface';
import IController from '../../interfaces/contoller.interface'
import { Router, Request, Response } from "express";

import logger from '../../loggerConfig';
import authMiddleware, {assertIRequest} from '../../middlewares/auth.middleware';
import { StatusCodes } from 'http-status-codes';


export default class ServiceController implements IController {
  path: string;
  router: Router = Router();
  name: string;
  service: IServices;

  constructor(service_name: string, service: IServices) { 
    this.name = service_name;
    this.path = `/service/${service_name}`;
    this.service = service
    this.initService()
    logger.info('path: => %s is set', this.path, {service: `serviceController => ${this.name}`})
  }

  private initService = (): void => {
    this.router.use(this.path, this.service.router)
    this.router.post(`${this.path}/setToken/:token`, authMiddleware, this.postToken);
    this.router.get(`${this.path}/logged`, authMiddleware, this.getLogInfo);

    // this method is only here to check if routes works well
    this.router.get(`${this.path}/`, (_: Request, res: Response) => {
      res.send("wooof")
    })
  }

  private getLogInfo = async  (request: Request, response: Response): Promise<void> => {
    assertIRequest(request);
    logger.info('getting Token...', {service: `serviceController => ${this.name}`});
    const user = request.user;
    try {
      const token = await user.get(this.name + 'Token');
      console.log("token:::: ", token)
      if (user && token !== undefined) {
        response.status(StatusCodes.OK).json(token)
        logger.info('successful', {service: `serviceController => ${this.name}`, method: "getLogInfo"});
      } else {
        logger.error('User or Token undefined', {service: `serviceController => ${this.name}`, method: "getLogInfo"});
        response.status(StatusCodes.NOT_FOUND).json({ error: 'User or Token undefined' })
      }
    } catch (err) {
        logger.error('retrieving token ', err, {service: `serviceController => ${this.name}`, method: "getLogInfo"});
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Can\'t retrieve token...'})
    }
  }

  private postToken = async (request: Request, response: Response): Promise<void> => {
    assertIRequest(request);
    logger.info('posting Token...', {service: `serviceController => ${this.name}`})
    const { token } = request.params;
    const user = request.user;
    const nameToken: string = this.name + 'Token';

    if (user && token) {
      user.set({[nameToken]: token});
      await user.save();
      logger.info('successful', {service: `serviceController => ${this.name}`, user: user})
      response.status(StatusCodes.CREATED).json('Connected to service');
    } else {
      logger.error('User not found or no Google Token in header', {service: `serviceController => ${this.name}`, user: user})
      response.status(StatusCodes.NOT_FOUND).json('User not found or no Google Token in header');
    }
  }
}
