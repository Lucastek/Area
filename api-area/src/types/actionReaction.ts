import { Document } from 'mongoose'

export interface IActionReaction extends Document {
  name: string
  description: string
  active: boolean
  serviceId: string
};
