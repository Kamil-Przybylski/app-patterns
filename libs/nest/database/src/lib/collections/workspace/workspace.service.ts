import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceEntity } from './workspace.entity';
import { Repository } from 'typeorm';
import { IUserDb } from '../user/user.models';
import { ICreateWorkspaceReqDto } from '@libs/shared/communication';
import { IWorkspaceDb } from './workspace.models';
import { WorkspaceId } from '@libs/shared/models';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(WorkspaceEntity)
    private workspaceRepository: Repository<WorkspaceEntity>,
  ) {}

  getAll(user: IUserDb): Promise<IWorkspaceDb[]> {
    return this.workspaceRepository.find({ where: { createdBy: user.id } });
  }

  getOne(id: WorkspaceId, user: IUserDb): Promise<IWorkspaceDb | null> {
    return this.workspaceRepository.findOne({ where: { id, createdBy: user.id } });
  }

  createOne(dto: ICreateWorkspaceReqDto, user: IUserDb): Promise<IWorkspaceDb> {
    const workspace = new WorkspaceEntity();
    workspace.title = dto.title;
    workspace.createdBy = user.id;

    return this.workspaceRepository.save(workspace);
  }
}
