import { Module } from '@nestjs/common';
import { PlanetEntity } from './entity/planet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetService } from './planet.service';
import { PlanetController } from './planet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetEntity])], 
  providers: [PlanetService],
  controllers: [PlanetController],
})
export class PlanetModule {}
