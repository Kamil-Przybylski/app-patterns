import { TaskId, UserId, WorkspaceId } from '../common';
import { IBaseEntity } from './base.model';

export interface IWorkspaceBaseEntity {
  title: string;
  userIds: UserId[];
  taskIds: TaskId[];
}

export interface IWorkspaceEntity extends IBaseEntity<WorkspaceId>, IWorkspaceBaseEntity {
  createdBy: UserId;
}
