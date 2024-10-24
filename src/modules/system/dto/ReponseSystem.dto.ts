import { PlanteResponseDto } from 'src/modules/planet/dto/ResponsePlanetDto';
import { SystemEntity } from '../entity/system.entity';
export class ResponseSystemDto {

  id: string;
  name: string; 
  creator: string;
  planets: PlanteResponseDto[];
  create_at: Date;

constructor(system: SystemEntity){
  this.id = system.id
  this.name = system.name
  this.creator = system.user.name
  this.planets = system.planets.map((p) => new PlanteResponseDto(p))
  this.create_at = system.createdAt;
}
}