import { Body, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/CreateUserDto";

export class UsersController {
  constructor(private usersService: UserService){}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto){
    return await this.usersService.create(createUserDto);
  }
}