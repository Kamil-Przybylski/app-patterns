import { ISignInDto, ISignInResponseDto, ISignUpDto, IUserDto } from '@libs/shared/communication';
import { Observable } from 'rxjs';

export class StubAuthenticationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUp(payload: ISignUpDto): Observable<IUserDto> {
    throw new Error('Method not implemented!');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn(payload: ISignInDto): Observable<ISignInResponseDto> {
    throw new Error('Method not implemented!');
  }
}
