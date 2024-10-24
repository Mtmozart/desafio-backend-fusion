import { SystemEntity } from "src/modules/system/entity/system.entity";

export class SystemResponseDto {

  name: string;
  id: string;

  constructor(system: SystemEntity){
    this.id = system.id
    this.name = system.name
  }
}