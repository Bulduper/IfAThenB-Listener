import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';
import { ActionService } from 'src/action/action.service';

@Injectable()
export class HttpTriggerService {
  constructor(
    private readonly httpService: HttpService,
    private actionService: ActionService,
  ) {}

  async runActionForTrigger(triggerName: string, body: any) {
    //find trigger in db
    const triggerData = await lastValueFrom(this.findTrigger(triggerName));
    if (!triggerData)
      throw new HttpException(
        'This trigger does not exist',
        HttpStatus.NOT_FOUND,
      );
    const actionIds = triggerData.actions;
    actionIds.forEach(async (id) => {
      const action = await lastValueFrom(this.actionService.findActionById(id));
      console.log('Action: ' + action);
      this.actionService.executeAction(action);
    });
    return triggerData;
  }

  findTrigger(triggerName: string): Observable<any> {
    return this.httpService
      .get(`http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/trigger/${triggerName}`)
      .pipe(map((res) => res.data));
  }

  getTriggers(): Observable<any> {
    return this.httpService
      .get(`http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/trigger`)
      .pipe(map((res) => res.data));
  }
}
