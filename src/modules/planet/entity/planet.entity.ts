import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StarWarsFaction } from "../enum/starWarsFaction.enum";
import { UserEntity } from "src/modules/users/entity/user";
import { SystemEntity } from "src/modules/system/entity/system.entity";

@Entity({ name: 'planet' })
export class PlanetEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'faction', nullable: false })
  faction: StarWarsFaction;

  @ManyToOne(() => UserEntity, user => user.planets)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => SystemEntity, system => system.planets)
  @JoinColumn({ name: 'system_id' })
  system: SystemEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
