import { ApiAuthGuard, GetUser } from '@libs/nest/auth';
import { WorkspaceRoutesEnum } from '@libs/shared/communication';
import { CreateWorkspaceDto, WorkspaceDto, WorkspacesService } from '@libs/nest/domains/workspace';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IUserDb } from '@libs/nest/database';
import { WorkspaceId } from '@libs/shared/models';

@UseGuards(ApiAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(WorkspaceRoutesEnum.WORKSPACE)
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspacesService) {}

  @Get()
  getAll(@GetUser() user: IUserDb): Promise<WorkspaceDto[]> {
    return this.workspaceService.getAll(user);
  }

  @Post()
  createOne(@Body() dto: CreateWorkspaceDto, @GetUser() user: IUserDb): Promise<WorkspaceDto> {
    return this.workspaceService.createOne(dto, user);
  }

  @Get(`:${WorkspaceRoutesEnum.WORKSPACE_ID}`)
  getOne(
    @Param(WorkspaceRoutesEnum.WORKSPACE_ID) id: WorkspaceId,
    @GetUser() user: IUserDb,
  ): Promise<WorkspaceDto> {
    return this.workspaceService.getOne(id, user);
  }
}
