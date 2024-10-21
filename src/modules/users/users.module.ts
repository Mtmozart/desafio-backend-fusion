import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entity/user';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], 
  providers: [UserService],
  controllers: [UsersController],
  exports: [], 
})
export class UsersModule {}