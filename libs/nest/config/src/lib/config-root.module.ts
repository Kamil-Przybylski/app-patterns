import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadConfig } from './config.utils';
import * as Joi from 'joi';
import { ConfigRootService } from './config-root.service';

@Global()
@Module({})
export class ConfigRootModule {
  static forRoot<T>(options: { configSchema: Joi.ObjectSchema<T>; configNames: string[] }): DynamicModule {
    return {
      module: ConfigRootModule,
      imports: [
        ConfigModule.forRoot({
          load: [loadConfig(options.configSchema, options.configNames)],
          isGlobal: true,
          ignoreEnvFile: true,
        }),
      ],
      providers: [ConfigRootService],
      exports: [ConfigModule, ConfigRootService],
    };
  }
}
