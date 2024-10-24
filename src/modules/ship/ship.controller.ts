import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Request, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Delete, Patch } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/configs/roles.decorator';
import { CreateShipDto } from './dto/CreateShip.dto';
import { ResponseShipDto } from './dto/ResponseShip.dto';
import { ShipService } from './ship.service';
import { ShipUpdateDto } from './dto/ShiptUpdate.dto';

@Controller('ship')
@ApiTags('Ship')
export class ShipController {

  constructor(
    private readonly shipService: ShipService
  ){}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findAll(){
    return (await this.shipService.findAll()).map((g) => new ResponseShipDto(g))
  }
  

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string){
    return new ResponseShipDto (await this.shipService.findOne(id))
     }

  @Post()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Roles('jedi, grand_master, darth, lord_sith, padawan')
  async create(@Body() createDto: CreateShipDto,  @Request() req: any){
    return new ResponseShipDto(await this.shipService.create(createDto, req.user.id))
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('jedi, grand_master, darth, lord_sith')
  async updates(@Param('id') id: string,  @Request() req: any, @Body() update: ShipUpdateDto){
    return new ResponseShipDto(await this.shipService.update(id, req.user.id, update))
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @Roles('jedi, grand_master, darth, lord_sith')
  async delete(@Param('id') galaxyId: string){
    return await this.shipService.delete(galaxyId)
  }

}
