import { IServer } from './server'

interface client {
  host: string | undefined
}

export interface IAbout {
  client: client
  server: IServer | null
}
