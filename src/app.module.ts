import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpTriggerController } from './http-trigger/http-trigger.controller';
import { HttpTriggerService } from './http-trigger/http-trigger.service';
import { ActionService } from './action/action.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CronTasksService } from './cron-tasks/cron-tasks.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    ClientsModule.register([
      {
        name: 'EXECUTOR_SERVICE',
        transport: Transport.TCP,
        options: { port: +process.env.EXECUTOR_TCP_PORT, host: process.env.EXECUTOR_HOST },
      },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, HttpTriggerController],
  providers: [AppService, HttpTriggerService, ActionService, CronTasksService],
})
export class AppModule {}
