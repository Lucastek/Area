import { Response, NextFunction, Request } from 'express'
import { JWT_SECRET } from '../serverConfig'
import * as jwt from 'jsonwebtoken'
import { IDataStoredInToken } from '../interfaces/jwt.interface'
import { StatusCodes } from 'http-status-codes'
import userModel from '../database/users.model'
import RequestWithUser from '../interfaces/requestWithUser.interface'
import logger from '../loggerConfig'

const authMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const cookies: any = request.cookies
  let err_str: string = 'Wrong Auth Token...';

  if (cookies?.Authorization !== undefined) {
    const secret = JWT_SECRET
    try {
      const verificationResponse = <any>jwt.verify(cookies.Authorization, secret) as IDataStoredInToken
      const id = verificationResponse._id
      const user = await userModel.findById(id)
      assertIRequest(request);
      if (user) {
        request.user = user
        next()
      } else {
        logger.error(err_str);
        response
          .status(StatusCodes.UNAUTHORIZED)
          .send({ errors: err_str})
      }
    } catch (err) {
      logger.error(err);
      response
        .status(StatusCodes.UNAUTHORIZED)
        .send({ errors: err_str})
    }
  }
  else {
    response.status(StatusCodes.UNAUTHORIZED).send({ errors: 'Wrong Auth Token...' })
  }
}

export function assertIRequest(req: RequestWithUser|Request): asserts req is RequestWithUser {
  // if (!req?.user) throw new Error('Request was not an IRequest');
}

export default authMiddleware
