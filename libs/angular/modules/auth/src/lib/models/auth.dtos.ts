import { ISignInDto, ISignUpDto } from '@libs/shared/communication';

export class SignUpDto implements ISignUpDto {
  username!: string;
  email!: string;
  password!: string;

  constructor(payload: ISignUpDto) {
    Object.assign(this, payload);
  }
}

export class SignInDto implements ISignInDto {
  email!: string;
  password!: string;

  constructor(payload: ISignInDto) {
    Object.assign(this, payload);
  }
}
