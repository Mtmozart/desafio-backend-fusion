import { Module } from '@nestjs/common';
import { SystemEntity } from './entity/system.entity';
import { UserEntity } from '../users/entity/user';
import { SystemService } from './system.service';
import { UserService } from '../users/user.service';
import { GalaxyService } from '../galaxy/galaxy.service';
import { SystemController } from './system.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalaxyEntity } from '../galaxy/entity/galaxy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemEntity, UserEntity, GalaxyEntity ])],
  providers: [SystemService, UserService, GalaxyService],
  controllers: [SystemController],
  exports: []
})
export class SystemModule {}
