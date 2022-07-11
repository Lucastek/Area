import { Document } from "mongoose";
import {IService} from "../types/service";

export default interface IUser extends Document {
  _id: string
  email: string
  password: string
  dateOfEntry: Date
  lastUpdated: Date
  services: IService[]
  googleToken: string,
  githubToken: string,
  facebookToken: string
}