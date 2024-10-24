import { PlanetEntity } from "../entity/planet.entity";

export class PlanteResponseDto {
  id:string;
  name: string;
  creator: string;
  faction: string;
  create_at: Date;

  constructor(planet: PlanetEntity){
    this.id = planet.id
    this.name = planet.name
    this.creator = planet.user.name
    this.faction = planet.faction
    this.create_at = planet.createdAt
  }

}