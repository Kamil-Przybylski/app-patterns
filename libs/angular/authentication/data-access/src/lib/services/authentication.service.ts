import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
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
  readonly #http = inject(HttpClient);
  readonly #url1 = `http://localhost:3901/admin/${AuthRoutesEnum.AUTH}`;

  signUp(payload: ISignUpDto): Observable<IUserDto> {
    return this.#http.post<IUserDto>(`${this.#url1}/${AuthRoutesEnum.SING_UP}`, payload);
  }

  signIn(payload: ISignInDto): Observable<ISignInResponseDto> {
    return this.#http.post<ISignInResponseDto>(`${this.#url1}/${AuthRoutesEnum.SING_IN}`, payload);
  }
}
