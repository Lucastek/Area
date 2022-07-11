import { Response, Request } from 'express'
import { IAbout } from '../../types/about'
import { IServer } from '../../types/server'
import { Service } from '../../models/aboutJson/serviceModel'
import { IService } from '../../types/service'
import logger from '../../loggerConfig'
import { StatusCodes } from 'http-status-codes'

const getAbout = async (req: Request, res: Response): Promise<void> => {
  try {
    const service: IService[] = await Service.find({userEmail: ""}).populate('actions').populate('reactions')
    const server: IServer = {
      currentTime: Date.now(),
      service: service
    }
    const about: IAbout = {
      client: {
        host: req.ip
      },
      server: server
    }
    res.status(StatusCodes.OK).json(about)
    logger.info("GetAbout success")
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json("Error when querying about")
    logger.error('Error when querying about %s', error)
  }
}

export default getAbout
