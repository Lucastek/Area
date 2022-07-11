import { Document } from "mongoose";

export interface IuserService extends Document {
  services: Array<string>,
  userId: string
}