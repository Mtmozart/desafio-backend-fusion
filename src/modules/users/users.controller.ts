import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/CreateUserDto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "./dto/UpdateUserDto";
import { DefaultResponseDto } from "./dto/DefaultUserResponseDto";
import { UserResponseDto } from "./dto/UserResponseDto";
import { AuthGuard } from "@nestjs/passport";


@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private usersService: UserService){}

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async profile(@Request() req: any): Promise<UserResponseDto> {
    return new UserResponseDto(await this.usersService.findOne(req.user.id));
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<DefaultResponseDto>{
    return new DefaultResponseDto(await this.usersService.findOne(id));
  }
  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK) 
    async findAll(): Promise<DefaultResponseDto[]> {
        return (await this.usersService.findAll()).map(
          (u) => new DefaultResponseDto(u)
        );
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<DefaultResponseDto>{
    return new DefaultResponseDto(await this.usersService.create(createUserDto));
  }

  @Patch('/')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(@Request() req: any, @Body() update: UpdateUserDto): Promise<UserResponseDto> {
    return new UserResponseDto(await this.usersService.update(update, req.user.id));
  } 

  @Delete('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async delete(@Request() req: any){
    return await this.usersService.delete(req.user.id);
  }

  
}

