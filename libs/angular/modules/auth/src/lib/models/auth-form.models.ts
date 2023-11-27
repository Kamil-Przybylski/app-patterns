export const enum FormControlsEnum {
  USERNAME = 'username',
  EMAIL = 'email',
  PASSWORD = 'password',
  REPEAT_PASSWORD = 'repeatPassword',
}

export interface ISignUpFormPayload {
  [FormControlsEnum.USERNAME]: string;
  [FormControlsEnum.EMAIL]: string;
  [FormControlsEnum.PASSWORD]: string;
  [FormControlsEnum.REPEAT_PASSWORD]: string;
}

export interface ISignInFormPayload {
  [FormControlsEnum.EMAIL]: string;
  [FormControlsEnum.PASSWORD]: string;
}
