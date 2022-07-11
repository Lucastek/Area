import { Request } from 'express'
import IUser from '../database/users.interface'

interface RequestWithUser extends Request {
  user: IUser
}

export default RequestWithUser
