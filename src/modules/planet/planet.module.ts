import { Module } from '@nestjs/common';
import { PlanetEntity } from './entity/planet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetService } from './planet.service';
import { PlanetController } from './planet.controller';
import { SystemEntity } from '../system/entity/system.entity';
import { UserEntity } from '../users/entity/user';
import { GalaxyEntity } from '../galaxy/entity/galaxy.entity';
import { SystemService } from '../system/system.service';
import { UserService } from '../users/user.service';
import { GalaxyService } from '../galaxy/galaxy.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetEntity, SystemEntity, UserEntity, GalaxyEntity])], 
  providers: [PlanetService, SystemService, UserService, GalaxyService],
  controllers: [PlanetController],
})
export class PlanetModule {}
