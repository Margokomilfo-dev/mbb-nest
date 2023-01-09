import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

const port = process.env.PORT || 5555;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://mbb-react.herokuapp.com',
      'https://mbb-react.vercel.app',
    ],
  });

  await app.listen(port, () => {
    console.log('App listen port: ', port);
  });
}

bootstrap();
