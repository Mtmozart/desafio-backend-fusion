import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user';
import { ShipEntity } from './entity/Ship.entity';
import { UserService } from '../users/user.service';
import { ShipService } from './ship.service';
import { ShipController } from './ship.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ShipEntity])],
  providers: [UserService, ShipService],
  controllers: [ShipController],
  exports: []
  
})
export class ShipModule {}
