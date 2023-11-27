import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public data = [];

  getData() {
    return this.data;
  }

  handleTestHere(data: any) {
    this.data.push(data);
    return { status: 'ok' };
  }
}
