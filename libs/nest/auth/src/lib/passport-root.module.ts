import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RootStrategy } from './models/strategy.models';
import { ConfigRootModule } from '@libs/nest/config';
import { configSchema } from './config';

@Module({})
export class PassportRootModule {
  static forRoot(options: { strategies: RootStrategy[] }): DynamicModule {
    return {
      module: PassportRootModule,
      imports: [ConfigRootModule.forFeature({ configSchema, configName: 'JWT' }), PassportModule],
      providers: [...options.strategies],
      exports: [PassportRootModule, PassportModule],
    };
  }
}
