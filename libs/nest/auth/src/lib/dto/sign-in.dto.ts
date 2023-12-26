import { ISignInReqDto, ISignInResDto } from '@libs/shared/communication';
import { JwtToken } from '@libs/shared/models';
import { Type } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { UserResDto } from './user.dto';

export class SignInReqDto implements ISignInReqDto {
  @IsString()
  @MinLength(6)
  email!: string;

  @IsString()
  @MinLength(3)
  password!: string;
}

export class SignInResDto implements ISignInResDto {
  accessToken!: JwtToken;
  refreshToken!: JwtToken;
  @Type(() => UserResDto)
  user!: UserResDto;

  constructor(payload: ISignInResDto) {
    Object.assign(this, payload);
  }
}
