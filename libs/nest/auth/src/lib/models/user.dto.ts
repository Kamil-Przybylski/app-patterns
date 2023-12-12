import { IUser } from '@libs/nest/database';
import { ISignInResponseDto, IUserDto } from '@libs/shared/communication';
import { NotFoundException } from '@nestjs/common';
import { Exclude, instanceToPlain } from 'class-transformer';

export class UserResponseDto implements IUserDto {
  id!: number;
  username!: string;
  email!: string;

  @Exclude()
  hashedPassword!: string;
  @Exclude()
  isActive!: boolean;
  @Exclude()
  createdDate!: Date;
  @Exclude()
  updatedDate!: Date;

  constructor(entity: IUser | null) {
    if (!entity) throw new NotFoundException();
    Object.assign(this, entity);
  }

  execute(): IUserDto {
    return instanceToPlain(this) as IUserDto;
  }
}

export class SignInResponseDto implements ISignInResponseDto {
  accessToken!: string;
  refreshToken!: string;

  constructor(payload: ISignInResponseDto) {
    Object.assign(this, payload);
  }
}
