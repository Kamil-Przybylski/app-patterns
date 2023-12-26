import { ISignUpReqDto } from '@libs/shared/communication';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SingUpDto implements ISignUpReqDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password!: string;
}
