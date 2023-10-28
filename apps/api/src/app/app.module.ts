import { ConfigurationService, configuration } from '@libs/nest/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IConfig, configSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration(configSchema)],
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    ClientsModule.register([
      { name: 'ADMIN', transport: Transport.TCP, options: { port: 3901 } },
    ]),
  ],
  controllers: [AppController],
  providers: [ConfigurationService<IConfig>, AppService],
})
export class AppModule {}
