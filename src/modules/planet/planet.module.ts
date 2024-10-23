import { Module } from '@nestjs/common';
import { PlanteEntity } from './entity/plante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetService } from './planet.service';
import { PlanetController } from './planet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlanteEntity])], 
  providers: [PlanetService],
  controllers: [PlanetController],
})
export class PlanetModule {}
