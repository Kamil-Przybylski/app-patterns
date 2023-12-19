import { IUser } from '@libs/nest/database';
import { ISignInResponseDto, IUserDto } from '@libs/shared/communication';
import { NotFoundException } from '@nestjs/common';
import { Exclude, Type, instanceToPlain } from 'class-transformer';
import { UserId } from '@libs/shared/models';

export class UserResponseDto implements IUser {
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
  @Type(() => UserResponseDto)
  user!: UserResponseDto;

  constructor(payload: ISignInResponseDto) {
    Object.assign(this, payload);
  }
}
