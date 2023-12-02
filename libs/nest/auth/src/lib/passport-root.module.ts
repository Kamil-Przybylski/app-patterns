import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RootStrategy } from './models/strategy.models';

@Module({})
export class PassportRootModule {
  static forRoot(options: { strategy: RootStrategy }): DynamicModule {
    return {
      module: PassportRootModule,
      imports: [PassportModule],
      providers: [options.strategy],
      exports: [PassportRootModule, PassportModule],
    };
  }
}
