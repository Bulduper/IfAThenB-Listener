import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: +configService.get('LISTENER_TCP_PORT'),
    },
  });
  await app.startAllMicroservices();
  await app.listen(+configService.get('LISTENER_PORT'));
}
bootstrap();
