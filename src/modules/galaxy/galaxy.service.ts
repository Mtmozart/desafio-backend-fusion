import { UserService } from './../users/user.service';
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GalaxyEntity } from './entity/galaxy.entity';
import { Repository } from 'typeorm';
import { CreateGalaxyDto } from './dto/createGalaxy.dto';
import { TypeUser } from '../users/enum/typeUserEnum';
import { UpdateGalaxyDto } from './dto/updateGalaxy.dto';
import { validation } from './utils/validation';


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
      where: { id: id }, 
      relations: ['user', 'systems'], 
    });    

    if(!galaxy){
      throw new BadRequestException("Galáxia não cadastrada");
    }
    return galaxy;
  }

  async findAll(){
    return this.galaxyRepository.find({
      relations: ['user', 'systems'], 
    })
  }

  async update(galaxyId: string, userId: string, updates: UpdateGalaxyDto){

    try{
     
    const galaxy = await this.findOne(galaxyId);

    const user = await this.userService.findOne(userId);

    if(user.typeUser === TypeUser.GRAND_MASTER){      
      galaxy.name = updates.name
      return await this.galaxyRepository.save(galaxy);
    }
    validation(galaxy, user)

    const galaxyExists = await this.galaxyRepository.findOne({
      where: {name: updates.name.toLowerCase()}
    })
    if(galaxy.name !== updates.name.toLowerCase() && galaxyExists){
      throw new ConflictException("Galáxia já registrada.")
    }
    
    galaxy.name = updates.name.toLowerCase()

    return await this.galaxyRepository.save(galaxy);
    } catch(error){
      throw(error)
    }

  }


  async delete(galaxyId: string, userId: string){
    try{

    const galaxy = await this.findOne(galaxyId)
    const user = await this.userService.findOne(userId);
   
    if(user.typeUser === TypeUser.GRAND_MASTER){
      return await this.galaxyRepository.delete(galaxyId);
    }
    validation(galaxy, user)

   
    return await this.galaxyRepository.delete(galaxyId);

    }
    catch(error){
      throw(error)
    }
  }
}