import { get } from 'env-var'
import { Request, Response } from 'express'

const env = (key: string, required = true) => get(key).required(required)

export const SERV_PORT = env('SERVER_PORT').default(8080).asPortNumber()
export const NODE_ENV = env('NODE_ENV').default("development").asString()
export const SERV_HOST = env('SERVER_HOST').default('localhost').asString()
export const JWT_SECRET = env('JWT_SECRET').default('can\'t tell this is a secret').asString()
export const GOOGLE_CLIENT_ID = env('GOOGLE_CLIENT_ID').asString();
export const GOOGLE_CLIENT_SECRET = env('GOOGLE_CLIENT_SECRET').asString();
export const GITHUB_CLIENT_ID = env('GITHUB_CLIENT_ID').asString();
export const GITHUB_CLIENT_SECRET = env('GITHUB_CLIENT_SECRET').asString();
export const FACEBOOK_CLIENT_ID = env('FACEBOOK_CLIENT_ID').asString();
export const HOST_MONGO = env('HOST_MONGO').default("localhost").asString();