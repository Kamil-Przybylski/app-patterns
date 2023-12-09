import { FormControlsEnum } from './authentication.models';

export interface ISignInFormPayload {
  [FormControlsEnum.EMAIL]: string;
  [FormControlsEnum.PASSWORD]: string;
}
