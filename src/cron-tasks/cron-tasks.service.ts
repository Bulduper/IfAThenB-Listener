import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { lastValueFrom } from 'rxjs';
import { HttpTriggerService } from 'src/http-trigger/http-trigger.service';

@Injectable()
export class CronTasksService {
  cronTasks: CronTask[] = [];
  constructor(
    private http: HttpService,
    private triggerSvc: HttpTriggerService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}
  async refreshTasks(): Promise<void> {
    const allTriggers = await lastValueFrom(this.triggerSvc.getTriggers());

    const cronTriggers = allTriggers.filter(
      (trigger) => trigger.type === 'CRON',
    );
    console.log('Refreshing tasks');
    console.log('Got tasks', cronTriggers);
    this.clearTasks();
    for (const trig of cronTriggers) {
      this.cronTasks.push({
        actionIds: trig.actions,
        cronPattern: trig.properties.pattern,
        triggerName: trig.name,
      });
    }
    console.log('Current cronTasks array: ', this.cronTasks);
    this.applyTasks();
  }

  applyTasks(): void {
    for (const task of this.cronTasks) {
      this.addCronJob(task.triggerName, task.cronPattern);
    }
  }

  clearTasks(): void {
    for (const task of this.cronTasks) {
      this.schedulerRegistry.deleteCronJob(task.triggerName);
    }
    this.cronTasks = [];
  }

  addCronJob(name: string, pattern: string) {
    const job = new CronJob(pattern, () => {
      console.log(`pattern (${pattern}) for job ${name} to run!`);
      this.triggerSvc.runActionForTrigger(name, {});
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    console.log(`job ${name} added!`);
  }
}

interface CronTask {
  actionIds: [string];
  triggerName: string;
  cronPattern: string;
}
