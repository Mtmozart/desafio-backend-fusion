import { ResponseSystemDto } from "src/modules/system/dto/ReponseSystem.dto";
import { GalaxyEntity } from "../entity/galaxy.entity";
export class DefaultResponseGalaxyDto {
 
  name: string;
  creator: string;
  system: ResponseSystemDto[]
  created_at: Date;

  constructor(galaxy: GalaxyEntity){
    this.name = galaxy.name;
    this.creator = galaxy.user.name
    this.system = galaxy.systems.map((s) => new ResponseSystemDto(s))
    this.created_at = galaxy.createdAt
  }
  
}