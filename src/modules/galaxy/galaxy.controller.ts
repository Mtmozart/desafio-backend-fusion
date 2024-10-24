import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GalaxyService } from './galaxy.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { CreateGalaxyDto } from './dto/createGalaxy.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/configs/roles.decorator';
import { DefaultResponseGalaxyDto } from './dto/defaultResponseGalaxy.dto';
import { UpdateGalaxyDto } from './dto/updateGalaxy.dto';

@Controller('galaxy')
@ApiTags('Galaxy')
export class GalaxyController {
  constructor(
    private readonly galaxyService: GalaxyService
  ){}


  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findAll(){
    return (await this.galaxyService.findAll()).map((g) => new DefaultResponseGalaxyDto(g))
  }
  

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string){
    return new DefaultResponseGalaxyDto (await this.galaxyService.findOne(id))
  }

  @Post()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Roles('jedi, grand_master, darth, lord_sith')
  async create(@Body() createDto: CreateGalaxyDto,  @Request() req: any){
    return await this.galaxyService.create(createDto, req.user.id)
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('jedi, grand_master, darth, lord_sith')
  async updates(@Param('id') galaxyId: string,  @Request() req: any, @Body() update: UpdateGalaxyDto){
    return new DefaultResponseGalaxyDto(await this.galaxyService.update(galaxyId, req.user.id, update))
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @Roles('jedi, grand_master, darth, lord_sith')
  async delete(@Param('id') galaxyId: string,  @Request() req: any){
    return await this.galaxyService.delete(galaxyId, req.user.id)
  }
}


