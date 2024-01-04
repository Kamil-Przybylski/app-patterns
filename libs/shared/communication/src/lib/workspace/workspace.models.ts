import { IWorkspaceBaseEntity, IWorkspaceEntity } from '@libs/shared/models';

export interface IWorkspaceResDto extends Omit<IWorkspaceEntity, 'updatedDate' | 'createdDate'> {}

export interface ICreateWorkspaceReqDto extends Omit<IWorkspaceBaseEntity, 'taskIds' | 'userIds'> {}
