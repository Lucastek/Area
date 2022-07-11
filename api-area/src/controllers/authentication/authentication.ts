import IController from '../../interfaces/contoller.interface'
import { Router, Request, Response } from 'express'
import validationMiddleware from '../../middlewares/validation.middleware'
import CreateUserDto from '../../database/users.dto'
import LogInUserDto from '../../database/logInusers.dto'
import { StatusCodes } from 'http-status-codes'
import userModel from '../../database/users.model'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../serverConfig'
import { ITokenData, IDataStoredInToken } from '../../interfaces/jwt.interface'
import IUser from '../../database/users.interface'
import logger from '../../loggerConfig'
import { Service } from '../../models/aboutJson/serviceModel'
import {IService} from '../../types/service'
import { assertIRequest } from '../../middlewares/auth.middleware'

class AuthenticationController implements IController {
  public readonly path = '/auth'
  public readonly router = Router()
  private readonly user = userModel

  constructor () {
    this.initializeRoutes()
  }

  private initializeRoutes (): void {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration)
    this.router.post(`${this.path}/login`, validationMiddleware(LogInUserDto), this.loggingIn)
    this.router.post(`${this.path}/logout`, this.loggingOut)
  }

  private readonly setAllServicesForUSer = async (userId: string, userEmail: string): Promise<any> => {
      logger.log("info", "try to instantiate all services");
      const servicesArray: Array<IService> = [
        new Service({userId, userEmail, name: "Instagram", widget: [{name: 'Test'}, {name: 'Test'}, {name: 'Test'}, {name: 'Test'}]}),
        new Service({userId, userEmail, name: "Facebook", widget: [{name: 'Friends'}, {name: 'Name'}, {name: 'Picture'}]}),
        new Service({userId, userEmail, name: "Osu", widget: [{name: 'Ranking'}, {name: 'Count'}, {name: 'Level'}, {name: 'Accuracy'}]}),
        new Service({userId, userEmail, name: "Youtube", widget: [{name: 'Channel Name'}, {name: 'Views'}, {name: 'Subscribers'}, {name: 'Videos'}]}),
        new Service({userId, userEmail, name: "Tech", widget: [{name: 'User information'}, {name: 'Followers'}, {name: 'Following'}]}),
        new Service({userId, userEmail, name: "Sport", widget: [{name: 'Foot'}, {name: 'Rugby'}, {name: 'Basket'}]}),
      ]
    servicesArray.forEach(async (service) => {
      service.save()
        .then(() => logger.log("info", "instantiation service: %s ok", service.name))
        .catch((err: any) => {
          logger.error(err);
          throw new Error("pas ouf");
        });
    });
    return servicesArray;
  }

  private readonly registration = async (request: Request, response: Response): Promise<void> => {
    const userData: CreateUserDto = request.body

    if (await this.user.findOne({ email: userData.email }) != null) {
      response
        .status(StatusCodes.BAD_REQUEST)
        .send({ errors: `User with email: ${userData.email} already exist.` })
      logger.error("User: %s already exist in database.", userData.email)
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10)
      try {
        const user = new userModel({
          ...userData,
          password: hashedPassword,
          services: []
        });
        const services = await this.setAllServicesForUSer(user._id, user.email)
        user.services = services
        const tokenData = this.createToken(user)
        await user.save();
        user.password = ''
        logger.info("User %s: %s is created", userData.email, user._id);
        response.cookie("Authorization", tokenData.token, { httpOnly:true, maxAge: tokenData.expiresIn * 60 })
        response.send(user)
      } catch (err) {
        logger.error(err, {service: "Registration"});
        response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ errors: "Registration Fail please retry" })
      }
    }
  }

  private readonly loggingIn = async (request: Request, response: Response): Promise<void> => {
    const logInData: LogInUserDto = request.body
    const user = await this.user.findOne({ email: logInData.email })
    logger.info("trying to connect %s user", logInData.email);

    if (user !== null) {
      const isPasswordMatch = await bcrypt.compare(logInData.password, user.password)
      if (isPasswordMatch === true) {
        user.password = ''
        const tokenData = this.createToken(user)
        response.cookie("Authorization", tokenData.token, { httpOnly:true, maxAge: tokenData.expiresIn * 60 })
        response.send(user)
        logger.info("User %s is logged-in", logInData.email);
      } else {
        response
          .status(StatusCodes.UNAUTHORIZED)
          .send({ errors: 'Wrong Credentials...' })
	logger.error("User: %s Wrong Credentials...", logInData.email, {service: "Auhentication"})
      }
    } else {
      response
        .status(StatusCodes.UNAUTHORIZED)
        .send({ errors: 'Wrong Credentials... user not found!' })
	logger.error("Wrong Credentials... user: %s not found!", logInData.email, {service: "Auhentication"})
    }
  }

  private readonly loggingOut = (request: Request, response: Response): void => {
    assertIRequest(request);
    logger.info("User %s deconnected", request.user.email)
    response.cookie('Authorization','', { httpOnly: true, maxAge: 0 })
    response.send(200)
  }

  private createToken (user: IUser): ITokenData {
    const expiresIn = 60 * 60 * 60 // hihi
    const secret = JWT_SECRET
    const dataStoredInToken: IDataStoredInToken = { _id: user._id }
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    }
  }
}

export default AuthenticationController
