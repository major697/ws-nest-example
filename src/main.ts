import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as dotenv from 'dotenv'

dotenv.config()

const logger = new Logger('Main')

const app = async () => {
  const app = await NestFactory.create(AppModule)

  const config = app.get<ConfigService>(ConfigService)
  const PORT = process.env.PORT || config.get<string>('PORT')
  const CORS_URL = config.get<string>('CORS_URL')

  app.enableCors({
    credentials: true,
    origin: CORS_URL,
  })

  await app.listen(PORT)

  return app
}

app()
  .then(async app => {
    logger.log(`Application is running: ${await app.getUrl()}`)
  })
  .catch(e => {
    logger.error(`Can't open app: ${e}`)
  })
