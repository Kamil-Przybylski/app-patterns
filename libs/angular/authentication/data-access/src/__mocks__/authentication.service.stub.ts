import {
  ISignInReqDto,
  ISignInResDto,
  ISignUpReqDto,
  IUserResDto,
} from '@libs/shared/communication';
import { Observable } from 'rxjs';

export class AuthenticationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUp(payload: ISignUpReqDto): Observable<IUserResDto> {
    throw new Error('Method not implemented!');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn(payload: ISignInReqDto): Observable<ISignInResDto> {
    throw new Error('Method not implemented!');
  }
}
