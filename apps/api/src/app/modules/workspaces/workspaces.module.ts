import { DatabaseModule } from '@libs/nest/database';
import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspacesService } from '@libs/nest/domains/workspace';

@Module({
  imports: [DatabaseModule],
  controllers: [WorkspaceController],
  providers: [WorkspacesService],
})
export class WorkspaceModule {}
