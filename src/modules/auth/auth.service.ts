import { JwtService } from '@nestjs/jwt';
import { UserService } from './../users/user.service';
import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from './dto/LoginDto';
import { UserEntity } from '../users/entity/user';
import { JwtPayload } from './configs/jwt.payload';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ){}

  async validateUser(payload: JwtPayload): Promise<UserEntity>{
    const user = await this.userService.findOne(payload.sub)
    if(user.email != payload.email){
      throw new UnauthorizedException();
    }


    return user;
  }

  async login(data: LoginDto){
    const user = await this.userService.findByEmail(data.email);

    const passwordMatches = await compare(data.password, user.password);

    if (!passwordMatches) {
      throw new ForbiddenException('Erro nas credenciais de acesso.');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      roles: user.roles,
    };
    const token = this.jwtService.sign(payload)
    return { token };
  }
}