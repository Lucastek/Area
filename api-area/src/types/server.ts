import { IService } from './service'

export interface IServer {
  currentTime: number
  service: IService[]
}
