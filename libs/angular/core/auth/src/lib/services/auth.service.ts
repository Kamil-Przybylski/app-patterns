import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '@libs/ng/core/config';
import {
  AuthRoutesEnum,
  IRefreshTokenRequestDto,
  IRefreshTokenResponseDto,
} from '@libs/shared/communication';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #config = inject(APP_CONFIG);
  readonly #http = inject(HttpClient);
  readonly #url = `${this.#config.authUrl}/${AuthRoutesEnum.AUTH}`;

  logout(param: number | null): Observable<unknown> {
    console.log(666.1, param);
    if (!param) throw new Error('No userId provided!');
    console.log(666.2, param);
    return this.#http.get<unknown>(`${this.#url}/${AuthRoutesEnum.LOGOUT}/${param}`);
  }

  getRefreshToken(payload: IRefreshTokenRequestDto): Observable<IRefreshTokenResponseDto> {
    return this.#http.post<IRefreshTokenResponseDto>(
      `${this.#url}/${AuthRoutesEnum.REFRESH_TOKEN}`,
      payload,
    );
  }

  validPath(url: string) {
    return ![AuthRoutesEnum.REFRESH_TOKEN].some((fragment) => url.includes(fragment));
  }
}
