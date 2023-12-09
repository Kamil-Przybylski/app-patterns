import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthRoutesEnum, IRefreshTokenDto, ISignInResponseDto } from '@libs/shared/communication';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #http = inject(HttpClient);
  readonly #url1 = `http://localhost:3901/admin/${AuthRoutesEnum.AUTH}`;

  refreshToken(payload: IRefreshTokenDto): Observable<ISignInResponseDto> {
    return this.#http.post<ISignInResponseDto>(
      `${this.#url1}/${AuthRoutesEnum.REFRESH_TOKEN}`,
      payload,
    );
  }

  validPath(url: string) {
    return ![AuthRoutesEnum.REFRESH_TOKEN].some((fragment) => url.includes(fragment));
  }
}
