import { Body, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/CreateUserDto";

export class UsersController {
  constructor(private usersService: UserService){}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto){
    return await this.usersService.create(createUserDto);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string){
    return await this.usersService.findOne(id);
  }

  @Get('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string){
    return await this.usersService.delete(id);
  }
}