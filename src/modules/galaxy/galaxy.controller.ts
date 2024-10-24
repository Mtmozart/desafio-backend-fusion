import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GalaxyService } from './galaxy.service';
import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { CreateGalaxyDto } from './dto/createGalaxy.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/configs/roles.decorator';

@Controller('galaxy')
@ApiTags('Galaxy')
export class GalaxyController {
  constructor(
    private readonly galaxyService: GalaxyService
  ){}


  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('jedi, grand_master, darth, lord_sith')
  async create(@Body() createDto: CreateGalaxyDto,  @Request() req: any){
    return await this.galaxyService.create(createDto, req.user.id)
  }

  @Get('/:id')
  async findOne(@Param('id') id: string){
    return await this.galaxyService.findOne(id)
  }
}