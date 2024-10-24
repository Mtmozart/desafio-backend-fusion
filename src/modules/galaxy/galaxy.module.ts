import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalaxyEntity } from './entity/galaxy.entity';
import { GalaxyService } from './galaxy.service';
import { GalaxyController } from './galaxy.controller';
import { UserEntity } from '../users/entity/user';
import { UserService } from '../users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([GalaxyEntity, UserEntity])],
  providers: [GalaxyService, UserService],
  controllers: [GalaxyController],
  exports: []
})
export class GalaxyModule {}
