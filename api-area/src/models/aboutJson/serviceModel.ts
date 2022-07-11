import { Schema, model, Types } from 'mongoose'
import { IService } from '../../types/service'
import { IActionReaction } from '../../types/actionReaction'

const serviceSchema: Schema = new Schema({
  userEmail: {
    type: String,
    default: "",
    required: false
  },
  active: {
    type: Boolean,
    default: false,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  widget: [{
    name: String,
    active: {
      type: Boolean,
      default: false,
      required: false
    },
    required: false,
  }],
  actions: [{
    type: Schema.Types.ObjectId,
    ref: 'Action'
  }],
  reactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Reaction'
  }]
})

const Service = model<IService>('Service', serviceSchema)

export {Service, serviceSchema}
