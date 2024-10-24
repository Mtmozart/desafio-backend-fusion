import { SystemEntity } from '../entity/system.entity';
import { PlanetDto } from './planet.dto';
export class ResponseSystemDto {

  id: string;
  name: string; 
  creator: string;
  planets: PlanetDto[];
  create_at: Date;

constructor(system: SystemEntity){
  this.id = system.id
  this.name = system.name
  this.creator = system.user.name
  this.planets = system.planets.map((p) => new PlanetDto(p))
  this.create_at = system.createdAt;
}
}