import { Schema, model } from 'mongoose';
import { IuserService } from '../../../types/userService';

const userServiceSchema: Schema = new Schema({
  services: [{
    type: String,
    required: true
  }],
  userId: {
    type: String,
    required: true
  }
});

const userService = model<IuserService>('userService', userServiceSchema);

export default userService;