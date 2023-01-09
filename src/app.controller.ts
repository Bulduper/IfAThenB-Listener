import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CronTasksService } from './cron-tasks/cron-tasks.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private cronTasksSvc: CronTasksService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/sync')
  async synchronize(): Promise<string> {
    await this.cronTasksSvc.refreshTasks();
    return 'OK';
  }
}
