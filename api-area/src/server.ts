import express from 'express'
import { SERV_PORT, SERV_HOST, NODE_ENV } from './serverConfig'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './router'
import IController from './interfaces/contoller.interface'
import AuthenticationController from './controllers/authentication/authentication'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

import logger from "./loggerConfig"

import osuService from './Services/Osu/osu'
import githubService from './Services/github/github';
import googleService from './Services/google/google'  
import facebookService from './Services/facebook/facebook'

import ServiceController from './controllers/service/services.controller'


require('./mongo')

const corsOptions = {
  origin: ["http://localhost:3000", "https://whispr-area.tech"],
  credentials: true,
  exposedHeaders: ["Set-Cookie"],
  allowedHeaders: ["Content-Type"]
}

class Server {
  public app = express()

  constructor (controllers: IController[]) {
    this.initializeMiddlewares()
    this.initializeControllers(controllers);    

    logger.info(`node_env: ${NODE_ENV}`)
    this.app.listen(8080, () => logger.info(`Listening to ${SERV_HOST}:${SERV_PORT}`))
  }

  private initializeMiddlewares () {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    //this.app.set('trust proxy', true)
    this.app.use(cookieParser())
    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));   
    this.app.use(cors(corsOptions))
    this.app.use(router)
  }

  private initializeControllers (controllers: IController[]) {
    controllers.forEach(controller => this.app.use('/', controller.router))
    logger.info('Controllers successfully initialize')
  }
};

const server: Server = new Server([
  new AuthenticationController(),
  new ServiceController('osu', new osuService()),
  new ServiceController('google', new googleService()),
  new ServiceController('github', new githubService()),
  new ServiceController('facebook', new facebookService())
])

server.app.get('/', (_, res) => {
  res.send('Hello wolrd')
})
