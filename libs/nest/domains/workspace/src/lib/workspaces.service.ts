import { IUserDb, WorkspaceService } from '@libs/nest/database';
import { ICreateWorkspaceReqDto } from '@libs/shared/communication';
import { WorkspaceId } from '@libs/shared/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { WorkspaceDto } from './workspaces.dto';

@Injectable()
export class WorkspacesService {
  constructor(private workspaceService: WorkspaceService) {}

  async getAll(user: IUserDb): Promise<WorkspaceDto[]> {
    const workspaces = await this.workspaceService.getAll(user);
    return workspaces.map((workspace) => new WorkspaceDto(workspace));
  }

  async getOne(id: WorkspaceId, user: IUserDb): Promise<WorkspaceDto> {
    const workspace = await this.workspaceService.getOne(id, user);
    return new WorkspaceDto(workspace);
  }

  async createOne(dto: ICreateWorkspaceReqDto, user: IUserDb): Promise<WorkspaceDto> {
    try {
      const workspace = await this.workspaceService.createOne(dto, user);
      return new WorkspaceDto(workspace);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
