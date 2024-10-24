import { PlanetEntity } from './../../planet/entity/planet.entity';
export class PlanetDto {

  id: string;
  name: string;

  constructor(planet: PlanetEntity){
    this.id = planet.id
    this.name = planet.name
  }
  
}