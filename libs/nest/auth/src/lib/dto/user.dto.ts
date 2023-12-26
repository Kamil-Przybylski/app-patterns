import { IUserDb } from '@libs/nest/database';
import { UserId } from '@libs/shared/models';
import { NotFoundException } from '@nestjs/common';
import { Exclude } from 'class-transformer';

export class UserResDto implements IUserDb {
  id!: UserId;
  username!: string;
  email!: string;

  @Exclude()
  hashedRefreshToken!: string;
  @Exclude()
  hashedPassword!: string;
  @Exclude()
  isActive!: boolean;
  @Exclude()
  createdDate!: Date;
  @Exclude()
  updatedDate!: Date;

  constructor(entity: IUserDb | null) {
    if (!entity) throw new NotFoundException();
    Object.assign(this, entity);
  }
}
