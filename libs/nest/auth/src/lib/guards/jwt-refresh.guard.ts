import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyKeyEnum } from '../models/strategy.models';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(StrategyKeyEnum.JWT_REFRESH) {}
