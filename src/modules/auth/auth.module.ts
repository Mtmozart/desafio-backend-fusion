import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user';
import { UserService } from '../users/user.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './configs/jwt.strategy';
import { EnvConfig } from 'src/config/variables';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  JwtModule.register({
    secret: EnvConfig.JWT_SECRET,
    signOptions: { expiresIn: '7d' },
  })], 
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
