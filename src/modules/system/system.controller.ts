import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Request, Patch, Delete } from "@nestjs/common";
import { SystemService } from "./system.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../auth/configs/roles.decorator";
import { UpdateGalaxyDto } from "../galaxy/dto/updateGalaxy.dto";
import { CreateSystemDto } from "./dto/CreateSystem.dto";
import { ResponseSystemDto } from "./dto/ReponseSystem.dto";
import { ResponseSystemCreateDto } from "./dto/ReponseSystemCreate.dto";

@Controller('system')
@ApiTags("System")
export class SystemController {

  constructor(
    private readonly systemService: SystemService
  ){}
  
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findAll(){
    return (await this.systemService.findAll()).map((g) => new ResponseSystemDto(g))
  }
  

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string){
    return new ResponseSystemDto (await this.systemService.findOne(id))
     }

  @Post()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Roles('jedi, grand_master, darth, lord_sith')
  async create(@Body() createDto: CreateSystemDto,  @Request() req: any){
    return new ResponseSystemCreateDto (await this.systemService.create(createDto, req.user.id))
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('jedi, grand_master, darth, lord_sith')
  async updates(@Param('id') galaxyId: string,  @Request() req: any, @Body() update: UpdateGalaxyDto){
    return new ResponseSystemDto(await this.systemService.update(galaxyId, req.user.id, update))
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @Roles('jedi, grand_master, darth, lord_sith')
  async delete(@Param('id') galaxyId: string,  @Request() req: any){
    return await this.systemService.delete(galaxyId, req.user.id)
  }
}