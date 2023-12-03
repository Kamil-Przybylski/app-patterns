import { ConfigRootService, validateConfig } from '@libs/nest/config';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CollectionsModule } from './collections/collections.module';
import { IConfig, configSchema } from './config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (cs: ConfigRootService<IConfig>) => {
        const config = cs.get('db');
        validateConfig(configSchema, config);

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
      inject: [ConfigRootService],
    }),
    CollectionsModule,
  ],
  exports: [CollectionsModule],
})
export class DatabaseModule {}
