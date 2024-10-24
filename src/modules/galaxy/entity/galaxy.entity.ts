import { SystemEntity } from "src/modules/system/entity/system.entity";
import { UserEntity } from "src/modules/users/entity/user";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'galaxy' })
export class GalaxyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;  

  @ManyToOne(() => UserEntity, user => user.galaxies)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => SystemEntity, (system) => system.galaxy) 
  systems: SystemEntity[]

}