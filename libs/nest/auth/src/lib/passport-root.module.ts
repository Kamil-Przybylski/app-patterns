import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RootStrategy } from './models/strategy.models';

@Module({})
export class PassportRootModule {
  static forRoot(options: { strategies: RootStrategy[] }): DynamicModule {
    return {
      module: PassportRootModule,
      imports: [PassportModule],
      providers: [...options.strategies],
      exports: [PassportRootModule, PassportModule],
    };
  }
}
