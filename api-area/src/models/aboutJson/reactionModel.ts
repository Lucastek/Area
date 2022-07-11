import { Schema, model } from 'mongoose'
import { IActionReaction } from '../../types/actionReaction'

const reactionSchema: Schema = new Schema({
  service: {
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

const Reaction = model<IActionReaction>('Reaction', reactionSchema)

export default Reaction
