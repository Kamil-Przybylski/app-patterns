import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '@libs/ng/core/config';
import {
  AuthRoutesEnum,
  ISignInDto,
  ISignInResponseDto,
  ISignUpDto,
  IUserDto,
} from '@libs/shared/communication';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  readonly #config = inject(APP_CONFIG);
  readonly #http = inject(HttpClient);
  readonly #url = `${this.#config.authUrl}/${AuthRoutesEnum.AUTH}`;

  signUp(payload: ISignUpDto): Observable<IUserDto> {
    return this.#http.post<IUserDto>(`${this.#url}/${AuthRoutesEnum.SING_UP}`, payload);
  }

  signIn(payload: ISignInDto): Observable<ISignInResponseDto> {
    return this.#http.post<ISignInResponseDto>(`${this.#url}/${AuthRoutesEnum.SING_IN}`, payload);
  }
}
