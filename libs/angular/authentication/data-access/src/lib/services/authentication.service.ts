import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '@libs/ng/core/auth';
import { APP_CONFIG } from '@libs/ng/core/config';
import {
  AuthRoutesEnum,
  ISignInReqDto,
  ISignInResDto,
  ISignUpReqDto,
  IUserResDto,
} from '@libs/shared/communication';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  readonly #config = inject(APP_CONFIG);
  readonly #http = inject(HttpClient);
  readonly #url = `${this.#config.authUrl}/${AuthRoutesEnum.AUTH}`;

  signUp(payload: ISignUpReqDto): Observable<IUserResDto> {
    return this.#http.post<IUser>(`${this.#url}/${AuthRoutesEnum.SING_UP}`, payload);
  }

  signIn(payload: ISignInReqDto): Observable<ISignInResDto> {
    return this.#http.post<ISignInResDto>(`${this.#url}/${AuthRoutesEnum.SING_IN}`, payload);
  }
}
