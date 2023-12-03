import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthRoutesEnum, ISignInDto, ISignInResponseDto, ISignUpDto, IUserDto } from '@libs/shared/communication';
import { Observable, catchError, of } from 'rxjs';
import { SignInDto, SignUpDto } from '../models/auth.dtos';

@Injectable()
export class AuthService {
  readonly #http = inject(HttpClient);
  readonly #url1 = `http://localhost:3901/admin/${AuthRoutesEnum.AUTH}`;
  readonly #url2 = `http://localhost:3900/api`;

  signUp(payload: ISignUpDto): Observable<IUserDto> {
    const dto = new SignUpDto(payload);
    return this.#http.post<IUserDto>(`${this.#url1}/${AuthRoutesEnum.SING_UP}`, dto);
  }

  signIn(payload: ISignInDto): Observable<ISignInResponseDto> {
    const dto = new SignInDto(payload);
    return this.#http.post<ISignInResponseDto>(`${this.#url1}/${AuthRoutesEnum.SING_IN}`, dto);
  }

  test(): Observable<unknown> {
    return this.#http.get(this.#url2).pipe(catchError(() => of(null)));
  }
}
