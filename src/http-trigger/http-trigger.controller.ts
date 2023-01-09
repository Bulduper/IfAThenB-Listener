import { Body, Controller, Param, Post } from '@nestjs/common';
import { HttpTriggerService } from './http-trigger.service';

@Controller('http-trigger')
export class HttpTriggerController {
  constructor(private readonly httpTriggerService: HttpTriggerService) {}
  @Post(':triggerName')
  async triggerAction(
    @Body() triggerBody: any,
    @Param() triggerParams: any,
  ): Promise<any> {
    console.log('triggerBody');
    const res = await this.httpTriggerService.runActionForTrigger(
      triggerParams.triggerName,
      {},
    );
    console.log(res);
    return new Promise((resolve, reject) => {
      resolve(triggerParams.triggerName);
    });
  }
}
