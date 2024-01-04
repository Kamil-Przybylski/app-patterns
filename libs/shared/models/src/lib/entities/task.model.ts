import { TaskId, UserId, WorkspaceId } from '../common';
import { IBaseEntity } from './base.model';

export interface IWorkspaceBaseEntity {
  createdBy: UserId;
  workspaceId: WorkspaceId;
}

export interface IWorkspaceEntity extends IBaseEntity<TaskId>, IWorkspaceBaseEntity {}
