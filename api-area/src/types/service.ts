import { IActionReaction } from './actionReaction'
import { IServer } from './server'
import { Document } from 'mongoose'

export interface IService extends Document {
  userEmail: string
  name: string
  active: boolean
  actions: IActionReaction[]
  reactions: IActionReaction[]
  widget: [{
    name: string,
    active: boolean,
    required: false,
  }],
}
