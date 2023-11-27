import { Injectable } from '@nestjs/common';
import { IUser, UsersService } from '@libs/nest/database';
import { SingUpDto } from './authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  public signUp(signUpDto: SingUpDto): Promise<IUser> {
    return this.usersService.signUp(signUpDto);
  }
}
