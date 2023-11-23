import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public data = [];

  getData() {
    return this.data;
  }

  handleTestHere(data: any) {
    this.data.push(data);
    return { status: 'ok' };
  }
}
