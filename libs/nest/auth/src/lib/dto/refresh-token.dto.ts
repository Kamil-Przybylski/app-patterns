import { IRefreshTokenReqDto } from '@libs/shared/communication';
import { JwtToken } from '@libs/shared/models';
import { IsString } from 'class-validator';

export class RefreshTokenReqDto implements IRefreshTokenReqDto {
  @IsString()
  refreshToken!: JwtToken;
}
