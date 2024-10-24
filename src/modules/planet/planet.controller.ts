import { PlanetService } from './planet.service';
import { Body, Controller, Get, HttpCode, Request, HttpStatus, Param, Post, UseGuards, Patch, Delete } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/configs/roles.decorator";
import { CreatePlanetDto } from './dto/CreatePlanet.dto';
import { PlanteResponseDto } from './dto/ResponsePlanetDto';
import { UpdatePlanetDto } from './dto/UpdatePlanet.dto';

@Controller('planet')
@ApiTags('Planet')
export class PlanetController {

  constructor(
    private readonly planetService: PlanetService
  ){

  }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findAll(){
    return (await this.planetService.findAll()).map((g) => new PlanteResponseDto(g))
  }
  

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string){
    return new PlanteResponseDto (await this.planetService.findOne(id))
     }

  @Post()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Roles('jedi, grand_master, darth, lord_sith')
  async create(@Body() createDto: CreatePlanetDto,  @Request() req: any){
    return new PlanteResponseDto (await this.planetService.create(createDto, req.user.id))
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('jedi, grand_master, darth, lord_sith')
  async updates(@Param('id') planetId: string,  @Request() req: any, @Body() update: UpdatePlanetDto){
    return new PlanteResponseDto(await this.planetService.update(planetId, req.user.id, update))
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @Roles('jedi, grand_master, darth, lord_sith')
  async delete(@Param('id') planetId: string,  @Request() req: any){
    return await this.planetService.delete(planetId, req.user.id)
  }
}