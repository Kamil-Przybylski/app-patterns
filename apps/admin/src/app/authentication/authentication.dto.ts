import { ISignInDto, ISignUpDto, IRefreshTokenRequestDto } from '@libs/shared/communication';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class SingUpDto implements ISignUpDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}

export class SignInDto implements ISignInDto {
  @IsString()
  @MinLength(6)
  email: string;

  @IsString()
  @MinLength(3)
  password: string;
}

export class RefreshTokenRequestDto implements IRefreshTokenRequestDto {
  @IsString()
  refreshToken: string;
}
