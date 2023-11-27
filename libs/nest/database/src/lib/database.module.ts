import { validateConfiguration } from '@libs/nest/configuration';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CollectionsModule } from './collections/collections.module';
import { IConfig, configSchema } from './config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<IConfig>) => {
        const config = configService.get('db', { infer: true });
        validateConfiguration(configSchema, config);

        return {
          type: config?.type,
          host: config?.host,
          port: config?.port,
          username: config?.username,
          password: config?.password,
          database: config?.database,
          synchronize: config?.synchronize,
          autoLoadEntities: true,
        } as TypeOrmModuleOptions;
      },
      inject: [ConfigService],
    }),
    CollectionsModule,
  ],
  exports: [CollectionsModule],
})
export class DatabaseModule {}
