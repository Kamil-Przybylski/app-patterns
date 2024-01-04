import { TaskId, UserId, WorkspaceId } from '@libs/shared/models';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { IWorkspaceDb } from './workspace.models';

@Entity()
export class WorkspaceEntity extends BaseEntity<WorkspaceId> implements IWorkspaceDb {
  @Column()
  title: string;

  @Column({ type: 'int' })
  createdBy: UserId;

  taskIds: TaskId[];
  userIds: UserId[];
}
