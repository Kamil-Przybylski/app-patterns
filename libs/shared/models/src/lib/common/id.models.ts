import { Flavor } from '../models';

export type UserId = Flavor<number, 'User'>;
export type WorkspaceId = Flavor<number, 'Workspace'>;
export type TaskId = Flavor<number, 'Task'>;
