import { model, Document } from 'mongoose'
import IUser from './users.interface'
import UserSchema from './users.schema'

const userModel = model<IUser>('User', UserSchema)
export default userModel
