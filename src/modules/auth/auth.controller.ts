import { AuthService } from './auth.service';
import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dto/LoginDto";
import { ApiTags } from "@nestjs/swagger";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ){}

  @Post()
  async login(@Body() data: LoginDto){
    return await this.authService.login(data);
  }
  
}