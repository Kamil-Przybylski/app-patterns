import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '@libs/ng/core/config';
import {
  AuthRoutesEnum,
  IRefreshTokenReqDto,
  IRefreshTokenResDto,
} from '@libs/shared/communication';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #config = inject(APP_CONFIG);
  readonly #http = inject(HttpClient);
  readonly #url = `${this.#config.authUrl}/${AuthRoutesEnum.AUTH}`;

  logout(param: number | null): Observable<unknown> {
    if (!param) throw new Error('No userId provided!');
    return this.#http.get<unknown>(`${this.#url}/${AuthRoutesEnum.LOGOUT}/${param}`);
  }

  getRefreshToken(payload: IRefreshTokenReqDto): Observable<IRefreshTokenResDto> {
    return this.#http.post<IRefreshTokenResDto>(
      `${this.#url}/${AuthRoutesEnum.REFRESH_TOKEN}`,
      payload,
    );
  }

  isAuthPath(url: string) {
    const urlFragments = url.split('/');
    return [AuthRoutesEnum.AUTH].some((fragment) => urlFragments.includes(fragment));
  }
}
