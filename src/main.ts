import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalMiddleware } from './middlewares/global.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalMiddleware)
  await app.listen(3000);
}
bootstrap();
