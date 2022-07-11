import { Router } from 'express'
import getAbout from './controllers/about/index'
import { getServices, createService, setServiceState, setWidgetState } from './controllers/service/index'
import { createAction } from './controllers/action/index'
import { createReaction } from './controllers/reaction/index'
import { getServiceFromUser, saveService } from './controllers/userService/userService'
import authMiddleware from './middlewares/auth.middleware'
import { NODE_ENV } from './serverConfig'

const router: Router = Router()

const env = NODE_ENV === 'production' ? '/api' : ''

router.get(`${env}/about.json`, getAbout)
router.get(`${env}/services`, authMiddleware, getServices)
router.post(`${env}/service`, createService)
router.put(`${env}/service`, authMiddleware, setServiceState)
router.post(`${env}/user/service`, authMiddleware, saveService);
router.get(`${env}/user/service`, authMiddleware, getServiceFromUser);
router.post(`${env}/action/:id`, createAction)
router.post(`${env}/reaction/:id`, createReaction)
router.put(`${env}/widget`, authMiddleware, setWidgetState)

export default router
