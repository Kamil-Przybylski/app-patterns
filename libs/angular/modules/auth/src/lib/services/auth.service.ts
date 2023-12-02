import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthRoutesEnum, ISignInDto, ISignUpDto, IUserDto } from '@libs/shared/communication';
import { Observable } from 'rxjs';
import { SignInDto, SignUpDto } from '../models/auth.dtos';

@Injectable()
export class AuthService {
  readonly #http = inject(HttpClient);
  readonly #url = `http://localhost:3901/admin/${AuthRoutesEnum.AUTH}`;

  signUp(payload: ISignUpDto): Observable<IUserDto> {
    const dto = new SignUpDto(payload);
    return this.#http.post<IUserDto>(`${this.#url}/${AuthRoutesEnum.SING_UP}`, dto);
  }

  signIn(payload: ISignInDto): Observable<IUserDto> {
    const dto = new SignInDto(payload);
    return this.#http.post<IUserDto>(`${this.#url}/${AuthRoutesEnum.SING_IN}`, dto);
  }
}
