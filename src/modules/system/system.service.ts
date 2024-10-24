import { GalaxyService } from './../galaxy/galaxy.service';
import { UserService } from './../users/user.service';
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SystemEntity } from "./entity/system.entity";
import { Repository } from "typeorm";
import { CreateSystemDto } from './dto/CreateSystem.dto';
import { TypeUser } from '../users/enum/typeUserEnum';
import { UpdateSystemDto } from './dto/UpdateSystem.dto';
import { validation } from './util/validation';

@Injectable()
export class SystemService {

  constructor(
    @InjectRepository(SystemEntity)
    private readonly systemRepository: Repository<SystemEntity>,
    private readonly userService: UserService,
    private readonly galaxyService: GalaxyService
  ){}

  async create(data: CreateSystemDto, userId: string){
    try{
      const user = await this.userService.findOne(userId)
      if(user.typeUser == TypeUser.PADAWAN || user.typeUser == TypeUser.YOUNGLING ){
        throw new UnauthorizedException("Padawan ou youngling não podem cadastrar.")
      }
      const galaxy = await this.galaxyService.findOne(data.galaxyId);

      if(!galaxy){
        throw new BadRequestException("Galáxia não encontrada.")
      }
      const verifyByName = await this.systemRepository.findOne({
        where: {name: data.name }
      })
      if(verifyByName){
        throw new ConflictException("Sistema já registrados.")
      }
      const system = new SystemEntity();
      system.user = user;
      system.galaxy = galaxy;
      system.name = data.name.toLowerCase();  

      return await this.systemRepository.save(system)
    }catch(error){
      throw error;
    }
  }


  async findOne(id: string){    
    const system = await this.systemRepository.findOne({
      where: { id: id }, 
      relations: ['user', 'planets'], 
    });    
    if(!system){
      throw new BadRequestException("Sistema não encontrado.");
    }
    return system;
  }  
  async findAll(){
    return this.systemRepository.find({
      relations: ['user', 'planets'], 
    })
  }

  async update(systemId: string, userId: string, updates: UpdateSystemDto){

    try{
     
    const system = await this.findOne(systemId);

    const user = await this.userService.findOne(userId);

    if(user.typeUser === TypeUser.GRAND_MASTER){      
      system.name = updates.name
      return await this.systemRepository.save(system);
    }
 
    const systemExists = await this.systemRepository.findOne({
      where: {name: updates.name.toLowerCase()}
    })
    if(system.name !== updates.name.toLowerCase() && systemExists){
      throw new ConflictException("Sistema já registrado.")
    }

    validation(system, user);
    
    system.name = updates.name.toLowerCase()

    return await this.systemRepository.save(system);
    } catch(error){
      throw(error)
    }

  }


  async delete(systemId: string, userId: string){
    try{

    const galaxy = await this.findOne(systemId)
    const user = await this.userService.findOne(userId);
   
    if(user.typeUser === TypeUser.GRAND_MASTER){
      return await this.systemRepository.delete(systemId);
    }
    validation(galaxy, user)
   
    return await this.systemRepository.delete(systemId);

    }
    catch(error){
      throw(error)
    }
  }
  
}