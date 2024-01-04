import { ConfigRootService } from '@libs/nest/config';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({})
export class MicroservicesModule {
  static forRoot<T>(options: {
    name: string;
    useFactory: (cs: ConfigRootService<T>) => number;
  }): DynamicModule {
    return {
      module: MicroservicesModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: options.name,
            useFactory: async (cs: ConfigRootService<T>) => {
              const port = options.useFactory(cs);
              return { transport: Transport.TCP, options: { port } };
            },
            inject: [ConfigRootService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
