import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { RequestHandler } from 'express'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

function validationMiddleware<T> (type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .send({
              errors: getReasonPhrase(StatusCodes.BAD_REQUEST)
            })
        } else {
          next()
        }
      })
  }
}

export default validationMiddleware
