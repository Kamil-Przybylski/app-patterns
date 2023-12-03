import { Injectable } from '@nestjs/common';
import { IUser, UsersService } from '@libs/nest/database';
import { SingInDto, SingUpDto } from './authentication.dto';
import { JwtService } from '@nestjs/jwt';
import { ISignInResponseDto } from '@libs/shared/communication';
import { IJwtPayload } from '@libs/nest/auth';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  public signUp(signUpDto: SingUpDto): Promise<IUser> {
    return this.usersService.signUp(signUpDto);
  }

  public async signIn(signInDto: SingInDto): Promise<ISignInResponseDto> {
    const user = await this.usersService.signIn(signInDto);
    const tokenPayload: IJwtPayload = { sub: user.id, email: user.email };

    return {
      user,
      accessToken: await this.jwtService.signAsync(tokenPayload),
      refreshToken: await this.jwtService.signAsync(tokenPayload, { expiresIn: '20s' }),
    };
  }

  public async refresh(currentUser: IUser): Promise<ISignInResponseDto> {
    const user = await this.usersService.findOne({ id: currentUser.id });
    const tokenPayload: IJwtPayload = { sub: user.id, email: user.email };

    return {
      user,
      accessToken: await this.jwtService.signAsync(tokenPayload),
      refreshToken: await this.jwtService.signAsync(tokenPayload, { expiresIn: '20s' }),
    };
  }
}
