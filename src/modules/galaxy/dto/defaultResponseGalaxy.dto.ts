import { GalaxyEntity } from "../entity/galaxy.entity";
import { SystemResponseDto } from "./systeResponse.dto";
export class DefaultResponseGalaxyDto {
 
  name: string;
  creator: string;
  system: SystemResponseDto[]
  created_at: Date;

  constructor(galaxy: GalaxyEntity){
    this.name = galaxy.name;
    this.creator = galaxy.user.name
    this.system = galaxy.systems.map((s) => new SystemResponseDto(s))
    this.created_at = galaxy.createdAt
  }
  
}