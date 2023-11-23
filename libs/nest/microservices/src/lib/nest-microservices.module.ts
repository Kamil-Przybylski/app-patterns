import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({})
export class MicroservicesModule {
  static forAsyncRoot(options: {
    name: string;
    configFn: (cs: ConfigService) => number;
  }): DynamicModule {
    return {
      module: MicroservicesModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: options.name,
            useFactory: async (cs: ConfigService) => ({
              transport: Transport.TCP,
              options: { port: options.configFn(cs) },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
