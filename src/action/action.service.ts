import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';

@Injectable()
export class ActionService {
  constructor(
    @Inject('EXECUTOR_SERVICE') private execClient: ClientProxy,
    private readonly httpService: HttpService,
  ) {}

  findActionById(actionId: any): Observable<any> {
    return this.httpService
      .get(`http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/action/${actionId}`)
      .pipe(map((res) => res.data));
  }

  async executeAction(data: any) {
    this.execClient.emit<any>('execute_action', data);
  }
}
