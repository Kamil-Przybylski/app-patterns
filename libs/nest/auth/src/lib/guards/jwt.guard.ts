import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyKeyEnum } from '../models/strategy.models';

@Injectable()
export class JwtAuthGuard extends AuthGuard(StrategyKeyEnum.JWT) {}
