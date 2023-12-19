import { UserId } from '@libs/shared/models';

export interface IBase {
  id: UserId;
  createdDate: Date;
  updatedDate: Date;
}
