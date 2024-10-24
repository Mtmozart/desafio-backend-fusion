import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeUser } from '../enum/typeUserEnum';
import { SystemEntity } from 'src/modules/system/entity/system.entity';
import { GalaxyEntity } from 'src/modules/galaxy/entity/galaxy.entity';
import { PlanetEntity } from 'src/modules/planet/entity/planet.entity';
import { ShipEntity } from 'src/modules/ship/entity/Ship.entity';

@Entity({ name: 'user' })
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'type_user', nullable: false })
  typeUser: TypeUser;

  @Column('simple-array')
  roles: string[];

  @OneToMany(() => GalaxyEntity, galaxy => galaxy.user)
  galaxies: GalaxyEntity[];
  
  @OneToMany(() => SystemEntity, system => system.user)
  systems: SystemEntity[];
  
  @OneToMany(() => PlanetEntity, planet => planet.user)
  planets: PlanetEntity[];

  @OneToMany(() => ShipEntity, ship => ship.user)
  ships: ShipEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  
}