import { GalaxyEntity } from "src/modules/galaxy/entity/galaxy.entity";
import { PlanetEntity } from "src/modules/planet/entity/planet.entity";
import { UserEntity } from "src/modules/users/entity/user";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'system' })
export class SystemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
    
  @Column({ name: 'name', nullable: false })
  name: string;

  @ManyToOne(() => UserEntity, user => user.systems)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => PlanetEntity, planet => planet.system)
  planets: PlanetEntity[];

  @ManyToOne(() => GalaxyEntity, galaxy => galaxy.systems)
  @JoinColumn({ name: 'galaxy_id' })
  galaxy: GalaxyEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
