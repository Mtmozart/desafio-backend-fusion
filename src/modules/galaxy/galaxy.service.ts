import { UserService } from './../users/user.service';
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GalaxyEntity } from './entity/galaxy.entity';
import { Repository } from 'typeorm';
import { CreateGalaxyDto } from './dto/createGalaxy.dto';
import { TypeUser } from '../users/enum/typeUserEnum';


@Injectable()
export class GalaxyService {
  
  constructor(
    @InjectRepository(GalaxyEntity)
    private readonly galaxyRepository: Repository<GalaxyEntity>,
    private readonly userService:UserService
  ){}

  
  async create(data: CreateGalaxyDto, userId: string){

    try{
      const user = await this.userService.findOne(userId)
      if(user.typeUser == TypeUser.PADAWAN || user.typeUser == TypeUser.YOUNGLING ){
        throw new UnauthorizedException("Padawan ou youngling não podem cadastrar.")
      }
      const galaxyExists = await this.galaxyRepository.findOne({
        where: {name: data.name.toLowerCase()}
      })
      if(galaxyExists){
        throw new ConflictException("Galáxia já registrada.")
      }
      const galaxy = new GalaxyEntity();
      galaxy.user = user;
      galaxy.name = data.name.toLowerCase();  

      return await this.galaxyRepository.save(galaxy)
    }catch(error){
      throw error;
    }
  }


  async findOne(id: string){
    const galaxy = await this.galaxyRepository.findOne({
      where: {id: id}
    })

    if(!galaxy){
      throw new BadRequestException("Galáxia não cadastrada");
    }
    return galaxy;
  }
}