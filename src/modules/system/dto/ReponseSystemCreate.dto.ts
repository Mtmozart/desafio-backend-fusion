import { SystemEntity } from '../entity/system.entity';
export class ResponseSystemCreateDto {

  id: string;
  name: string; 
  creator: string;
  create_at: Date;

constructor(system: SystemEntity){
  this.id = system.id
  this.name = system.name
  this.creator = system.user.name
  this.create_at = system.createdAt;
}
}