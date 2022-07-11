import { Response, Request } from 'express'
import {StatusCodes} from 'http-status-codes'
import userModel from '../../database/users.model'
import logger from '../../loggerConfig'
import {assertIRequest} from '../../middlewares/auth.middleware'
import { Service } from '../../models/aboutJson/serviceModel'
import { IService } from '../../types/service'

const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IService, 'name'>

    const service: IService = new Service({
      name: body.name
    })
    const newService: IService = await service.save()
    const allService: IService[] = await Service.find()
    const message =  'new service created'
    res.status(StatusCodes.CREATED).json({
      message,
      service: newService,
      services: allService
    })

  } catch (error) {
    const err_str = "Can't retrieve services"
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({errors: err_str})
      logger.error("%s: error", err_str)
  }
}

const setWidgetState = async (req: Request, res: Response): Promise<void> => {
  assertIRequest(req);
  const user = req?.user;
  const {serviceName, widgetName, widgetState} = req.body;
  let err_str: string = '';
  console.log('serviceName, widgetName, widgetState', serviceName, widgetName, widgetState);

  if (user && serviceName !== undefined && widgetName !== undefined && widgetState !== undefined) {
    try {
      let services = user?.services;
      let index: number|undefined = services?.findIndex(service => service.name === serviceName);
      if (index === undefined || index !== undefined && index < 0) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({errors: err_str})
        return;
      }
      logger.error("%s: error", err_str)
      if (services) {
        let widget = services[index as number].widget;

        let widgetIndex = services[index as number].widget.findIndex(widget => widget.name === widgetName);
        widget[widgetIndex as number]['active'] = widgetState;
        await user?.updateOne({ services: services })
        await user?.save()
        res.status(StatusCodes.OK).json({ services })}
    }
    catch (err) {
      err_str = "Can't update widget"
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({errors: err_str})
      logger.error("%s: error", err_str)
    }
  } else {
    err_str = "missing one of the properties: serviceName, widgetState, widgetName"
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({errors: err_str})
    logger.error("%s: error", err_str)
  }
}

const setServiceState = async (req: Request, res: Response): Promise<void> => {
  assertIRequest(req)
  const user = req?.user
  const serviceName = req.body.serviceName
  const serviceState: boolean = req.body.serviceState
  let err_str: string = "";

  if (user && serviceName !== undefined && serviceState !== undefined) {
    try {
      let services = user?.services 
      let index: number|undefined = services?.findIndex(service => service.name === serviceName)

      if (index === undefined || index !== undefined && index < 0) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({errors: err_str})
        return;
      }
      logger.error("%s: error", err_str)
      if (services)
        services[index as number]['active'] = serviceState
      await user?.updateOne({ services: services })
      await user?.save()
      res.status(StatusCodes.OK).json({ services })
    } catch (error) {
      err_str = "Can't update service"
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({errors: err_str})
      logger.error("%s: error", err_str)
    }
  } else {
      err_str = "missing one of the properties: serviceName, serviceState"
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({errors: err_str})
      logger.error("%s: error", err_str)
  }
}

const getServices = async (req: Request, res: Response): Promise<void> => {
  assertIRequest(req)
  const user = req?.user
  let err_str: string = ""

  if (user) {
    try {
      res.status(StatusCodes.OK).json({ services: user?.services })
    } catch (error) {
      const err_str = "Can't retrieve services";
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({errors: err_str})
      logger.error("%s: error", err_str)
    }
  } else {
      err_str = "missing property: userId"
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({errors: err_str})
      logger.error("%s: error", err_str)
  }
}

export { createService, setServiceState, getServices, setWidgetState }
