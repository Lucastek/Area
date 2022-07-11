import { Schema, model } from 'mongoose'
import { IActionReaction } from '../../types/actionReaction'

const actionSchema: Schema = new Schema({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const Action = model<IActionReaction>('Action', actionSchema)

export default Action
