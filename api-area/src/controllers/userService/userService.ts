import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../loggerConfig";
import { assertIRequest } from "../../middlewares/auth.middleware";
import userService from "../../models/aboutJson/User/service";


const saveService = async (req: Request, res: Response): Promise<void> => {

  logger.info("try save service")
  try {
    assertIRequest(req);
    const { services } = req.body;
    const serviceFromUser = await userService.findOne({userId: req.user._id});
    if (!serviceFromUser) {
      const newServiceFromUser = await userService.create({userId: req.user._id, services: [...services]})
      await newServiceFromUser.save();
      res.status(StatusCodes.OK).json(newServiceFromUser);
      return;
    }
    serviceFromUser.services = [];
    serviceFromUser.services = [...services];
    await serviceFromUser.save();
    logger.info("service saved")
    res.status(StatusCodes.CREATED).send('service saved!');
  } catch (err) {
    logger.error(err, { service: "saveService"});
    res.status(StatusCodes.BAD_REQUEST).send('Error in request');
  }
};

const getServiceFromUser = async (req: Request, res: Response): Promise<void> => {
  try {
    assertIRequest(req);
    const userId = req.user._id;
    const serviceFromUser = await userService.findOne({userId: userId});
    if (!serviceFromUser) {
      logger.error("User not found", {service: "getServiceFromUser"})
      res.status(StatusCodes.BAD_REQUEST).send('User not found');
      return;
    }
    res.status(StatusCodes.OK).json(serviceFromUser?.services);
  }
  catch (err) {
    logger.error(err, {service: "getServiceFromUser"})
    res.status(StatusCodes.BAD_REQUEST).send('Error in request');
  }
};

export {saveService, getServiceFromUser};