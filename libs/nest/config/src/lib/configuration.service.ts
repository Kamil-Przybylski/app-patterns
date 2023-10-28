import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type KeyOf<T> = keyof T extends never ? string : keyof T;

@Injectable()
export class ConfigurationService<
  T = { [name: string]: unknown }
> extends ConfigService<T> {
  override get<P extends keyof T>(propertyPath: P): T[P] {
    return super.get(propertyPath as KeyOf<T>) as T[P];
  }
}
