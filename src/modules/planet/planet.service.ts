import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreatePlanetDto } from "./dto/CreatePlanet.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { PlanetEntity } from "./entity/planet.entity";
import { Repository } from "typeorm";
import { UserService } from "../users/user.service";
import { TypeUser } from "../users/enum/typeUserEnum";
import { SystemService } from "../system/system.service";
import { UpdatePlanetDto } from "./dto/UpdatePlanet.dto";
import { validation } from "./utils/validation";

@Injectable()
export class PlanetService {

  constructor(
    @InjectRepository(PlanetEntity)
    private readonly planetRepository: Repository<PlanetEntity>,
    private readonly userService: UserService,
    private readonly systemService: SystemService
  ){}

  async create(data: CreatePlanetDto, userId: string){
    try{
      const user = await this.userService.findOne(userId)
      if(user.typeUser == TypeUser.PADAWAN || user.typeUser == TypeUser.YOUNGLING ){
        throw new UnauthorizedException("Padawan ou youngling não podem cadastrar.")
      }
      const system = await this.systemService.findOne(data.systemId);

      if(!system){
        throw new BadRequestException("Sistema não encontrada.")
      }
      const verifyByName = await this.planetRepository.findOne({
        where: {name: data.name }
      })

      if(verifyByName){
        throw new ConflictException("Planeta já registrados.")
      }
      const planet = new PlanetEntity();
      planet.user = user;
      planet.system = system;
      planet.faction = data.faction
      planet.name = data.name.toLowerCase();  

      return await this.planetRepository.save(planet)
    }catch(error){
      throw error;
    }
  }
  async findOne(id: string){    
    const planet = await this.planetRepository.findOne({
      where: { id: id }, 
      relations: ['user'], 
    });    
    if(!planet){
      throw new BadRequestException("Planeta não encontrado.");
    }
    return planet;
  }  
  async findAll(){
    return this.planetRepository.find({
      relations: ['user'], 
    })
  }

  async update(planetId: string, userId: string, updates: UpdatePlanetDto){

    try{
     
    const planet = await this.findOne(planetId);

    const user = await this.userService.findOne(userId);
    const newPlanet = Object.assign(planet, updates)

    if(updates.name){
      const systemExists = await this.planetRepository.findOne({
        where: {name: updates.name.toLowerCase()}
      })
      if(planet.name !== updates.name.toLowerCase() && systemExists){
        throw new ConflictException("Sistema já registrado.")
      }
    }

    if(user.typeUser === TypeUser.GRAND_MASTER){            
      return await this.planetRepository.save(newPlanet);
    }  
    validation(planet, user);
        
    return await this.planetRepository.save(planet);
    } catch(error){
      throw(error)
    }

  }


  async delete(systemId: string, userId: string){
    try{

    const planet = await this.findOne(systemId)
    const user = await this.userService.findOne(userId);
   
    if(user.typeUser === TypeUser.GRAND_MASTER){
      return await this.planetRepository.delete(systemId);
    }
    validation(planet, user)
   
    return await this.planetRepository.delete(systemId);

    }
    catch(error){
      throw(error)
    }
  }

}