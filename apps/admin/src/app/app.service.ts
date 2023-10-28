import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public data = [];

  getData() {
    return this.data;
  }

  handleTestHere(data: any) {
    console.log(666, data);

    this.data.push(data);
    return { status: 'ok' };
  }
}
