import { IWorkspaceDb } from '@libs/nest/database';
import { ICreateWorkspaceReqDto } from '@libs/shared/communication';
import { UserId, WorkspaceId, TaskId } from '@libs/shared/models';
import { NotFoundException } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateWorkspaceDto implements ICreateWorkspaceReqDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title!: string;
}

export class WorkspaceDto implements IWorkspaceDb {
  id!: WorkspaceId;
  createdBy!: UserId;
  userIds!: UserId[];
  taskIds!: TaskId[];
  title!: string;

  @Exclude() updatedDate!: Date;
  @Exclude() createdDate!: Date;

  constructor(entity: IWorkspaceDb | null) {
    if (!entity) throw new NotFoundException();
    Object.assign(this, entity);
  }
}
