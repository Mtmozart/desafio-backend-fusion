import { ShipEntity } from "../entity/Ship.entity";

export class ResponseShipDto {
  id: string;
  name: string;
  creator: string;
  create_at: Date;

  constructor(ship: ShipEntity){
    this.id = ship.id
    this.name = ship.name
    this.creator = ship.user.name;
    this.create_at = ship.createdAt
  }
}