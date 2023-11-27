import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class SingUpDto {
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
