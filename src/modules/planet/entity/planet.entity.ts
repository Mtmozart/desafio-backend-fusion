import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StarWarsFaction } from "../enum/starWarsFaction.enum";
import { UserEntity } from "src/modules/users/entity/user";
import { SystemEntity } from "src/modules/system/entity/system.entity";

@Entity({ name: 'user' })
export class PlanetEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'faction', nullable: false })
  faction: StarWarsFaction;

  @ManyToOne(() => UserEntity, user => user.planets)
  user: UserEntity;

  @ManyToOne(() => SystemEntity, (system) => system.planets) 
  system: SystemEntity;

}