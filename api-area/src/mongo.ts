import mongoose from 'mongoose'
import logger from './loggerConfig'
import { HOST_MONGO } from './serverConfig'

const url: string = `mongodb://${HOST_MONGO}:27017/area-db`
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => logger.info('Successfully connect to MongoDB.'))
  .catch(err => logger.error('Connection error', err, {service: "MongoDB"}))

export default mongoose
