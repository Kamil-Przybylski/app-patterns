import { JwtRefreshStrategy } from '../strategy';
import { JwtStrategy } from '../strategy/jwt.strategy';

export const StrategyKeyEnum = {
  JWT: 'jwt',
  JWT_REFRESH: 'jwt-refresh',
};

export type RootStrategy = typeof JwtStrategy | typeof JwtRefreshStrategy;
