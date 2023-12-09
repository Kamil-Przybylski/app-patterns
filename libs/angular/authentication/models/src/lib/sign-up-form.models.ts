import { FormControlsEnum } from './authentication.models';

export interface ISignUpFormPayload {
  [FormControlsEnum.USERNAME]: string;
  [FormControlsEnum.EMAIL]: string;
  [FormControlsEnum.PASSWORD]: string;
  [FormControlsEnum.REPEAT_PASSWORD]: string;
}
