import { GalaxyEntity } from "src/modules/galaxy/entity/galaxy.entity";
import { PlanteEntity } from "src/modules/planet/entity/plante.entity";
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class SystemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ name: 'name', nullable: false })
  name: string;

  @ManyToOne(() => PlanteEntity, planet => planet.id)
  planets: PlanteEntity[];

  @OneToMany(() => GalaxyEntity, galaxy => galaxy.id)
  galaxy: GalaxyEntity;
}