import { Injectable } from '@nestjs/common';
import { IUser, UsersService } from '@libs/nest/database';
import { SingInDto, SingUpDto } from './authentication.dto';
import { JwtService } from '@nestjs/jwt';
import { ISignInResponseDto } from '@libs/shared/communication';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  public signUp(signUpDto: SingUpDto): Promise<IUser> {
    return this.usersService.signUp(signUpDto);
  }

  public async signIn(signInDto: SingInDto): Promise<ISignInResponseDto> {
    const user = await this.usersService.signIn(signInDto);
    const tokenPayload = { sub: user.id, username: user.username };

    console.log(555, tokenPayload);
    return {
      user,
      accessToken: await this.jwtService.signAsync(tokenPayload),
    };
  }
}
