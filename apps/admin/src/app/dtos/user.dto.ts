import { IUser } from "@libs/nest/database";
import { NotFoundException } from "@nestjs/common";
import { Exclude } from 'class-transformer';

export class UserResponseDto implements IUser {
  id: number;
  username: string;
  email: string;

  @Exclude()
  hashedPassword: string;
  @Exclude()
  isActive: boolean;
  @Exclude()
  createdDate: Date;
  @Exclude()
  updatedDate: Date;

  constructor(entity: IUser | null) {
    if (!entity) throw new NotFoundException();
    Object.assign(this, entity);
  }
}
