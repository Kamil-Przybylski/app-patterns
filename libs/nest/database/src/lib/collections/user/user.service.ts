import { ISignInReqDto, ISignUpReqDto } from '@libs/shared/communication';
import { UserId } from '@libs/shared/models';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindOneOptions, QueryFailedError, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUserDb } from './user.models';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signUp(dto: ISignUpReqDto): Promise<IUserDb> {
    const user = new UserEntity();
    const salt = await bcrypt.genSalt();

    user.username = dto.username;
    user.email = dto.email;
    user.hashedPassword = await bcrypt.hash(dto.password, salt);

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.message.toLowerCase().includes('unique'))
          throw new ConflictException(error.message);
      }
      throw new BadRequestException(error);
    }
  }

  async signIn(dto: ISignInReqDto): Promise<IUserDb> {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException();

    const isAuthorized = await bcrypt.compare(dto.password, user.hashedPassword);
    if (!isAuthorized) throw new UnauthorizedException();

    return user;
  }

  async findOne(where: {
    id?: UserId;
    username?: string;
    email?: string;
  }): Promise<IUserDb | null> {
    if (!where.id && !where.username && !where.email) return null;

    const user = await this.usersRepository.findOne({
      where,
    } as FindOneOptions<UserEntity>);

    return user;
  }

  async findMany(): Promise<IUserDb[]> {
    return await this.usersRepository.find();
  }

  updateOne(id: UserId, dto: Partial<IUserDb>): Promise<UpdateResult> {
    return this.usersRepository.update(id, dto);
  }
}
