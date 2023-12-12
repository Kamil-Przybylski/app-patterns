import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configFactory, loadConfig } from './config.utils';
import * as Joi from 'joi';
import { ConfigRootService } from './config-root.service';
import { ConfigKey } from './config-root.keys';

@Global()
@Module({})
export class ConfigRootModule {
  static forRoot<T>(options: {
    configSchema: Joi.ObjectSchema<T>;
    configName: ConfigKey;
  }): DynamicModule {
    return {
      module: ConfigRootModule,
      imports: [
        ConfigModule.forRoot({
          load: [loadConfig(options.configSchema, options.configName)],
          isGlobal: true,
          ignoreEnvFile: true,
        }),
      ],
      providers: [ConfigRootService],
      exports: [ConfigModule, ConfigRootService],
    };
  }

  static forFeature<T>(options: {
    configSchema: Joi.ObjectSchema<T>;
    configName: ConfigKey;
  }): DynamicModule {
    return {
      module: ConfigRootModule,
      imports: [ConfigModule.forFeature(configFactory(options.configSchema, options.configName))],
      providers: [ConfigRootService],
      exports: [ConfigModule, ConfigRootService],
    };
  }
}
