import { Schema } from 'mongoose'
import { serviceSchema } from '../models/aboutJson/serviceModel'

const UserSchema = new Schema({
  email: String,
  password: String,
  dateOfEntry: {
    type: Date,
    default: new Date()
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  },
  googleToken: String,
  githubToken: String,
  facebookToken: String,
  services: {
    type: [serviceSchema],
    default: []
  }
})

export default UserSchema
