import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { UsersService } from './user/user.service';
import { WorkspaceEntity } from './workspace/workspace.entity';
import { WorkspaceService } from './workspace/workspace.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WorkspaceEntity])],
  providers: [UsersService, WorkspaceService],
  exports: [UsersService, WorkspaceService],
})
export class CollectionsModule {}
