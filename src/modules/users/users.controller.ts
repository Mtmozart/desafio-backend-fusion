import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/CreateUserDto";
import { ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "./dto/UpdateUserDto";
import { DefaultResponseDto } from "./dto/DefaultUserResponseDto";
import { UserResponseDto } from "./dto/UserResponseDto";


@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private usersService: UserService){}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<DefaultResponseDto>{
    return new DefaultResponseDto(await this.usersService.create(createUserDto));
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<UserResponseDto>{
    return new UserResponseDto(await this.usersService.findOne(id));
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() update: UpdateUserDto): Promise<UserResponseDto> {
    return new UserResponseDto(await this.usersService.update(update, id));
  } 

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string){
    return await this.usersService.delete(id);
  }

  @Get()
    @HttpCode(HttpStatus.OK) 
    async findAll(): Promise<DefaultResponseDto[]> {
        return (await this.usersService.findAll()).map(
          (u) => new DefaultResponseDto(u)
        );
  }
}

