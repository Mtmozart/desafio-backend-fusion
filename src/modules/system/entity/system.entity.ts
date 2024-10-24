import { GalaxyEntity } from "src/modules/galaxy/entity/galaxy.entity";
import { PlanetEntity } from "src/modules/planet/entity/planet.entity";
import { UserEntity } from "src/modules/users/entity/user";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'system' })
export class SystemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
    
  @Column({ name: 'name', nullable: false })
  name: string;

  @ManyToOne(() => UserEntity, user => user.systems)
  user: UserEntity;

  @OneToMany(() => PlanetEntity, planet => planet.system)
  planets: PlanetEntity[];

  @ManyToOne(() => GalaxyEntity, (galaxy) => galaxy.systems)
  galaxy: GalaxyEntity;
}