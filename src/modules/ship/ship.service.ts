import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ShipEntity } from "./entity/Ship.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "../users/user.service";
import { TypeUser } from "../users/enum/typeUserEnum";
import { CreateShipDto } from "./dto/CreateShip.dto";
import { ShipUpdateDto } from "./dto/ShiptUpdate.dto";

@Injectable()
export class ShipService {

  constructor(
    @InjectRepository(ShipEntity)
    private readonly shipRepository: Repository<ShipEntity>,
    private readonly userService: UserService
  ){}


  async create(data: CreateShipDto, userId: string){
    try{
      const user = await this.userService.findOne(userId)
      if(user.typeUser == TypeUser.YOUNGLING ){
        throw new UnauthorizedException("Youngling não podem cadastrar.")
      }

     const ship = new ShipEntity();
     ship.name = data.name.toLowerCase()
     ship.user = user;

     return await this.shipRepository.save(ship)
    }catch(error){
      throw error;
    }
  }


  async findOne(id: string){    
    const system = await this.shipRepository.findOne({
      where: { id: id }, 
      relations: ['user'], 
    });    
    if(!system){
      throw new BadRequestException("Nave não encontrada.");
    }
    return system;
  }  
  async findAll(){
    return this.shipRepository.find({
      relations: ['user'], 
    })
  }

  async update(id: string, userId: string, updates: ShipUpdateDto){

    try{
     
    const ship = await this.findOne(id);

    await this.userService.findOne(userId);

    if(updates.user_id){
      const newUser = await this.userService.findOne(updates.user_id);
      if(newUser.typeUser === TypeUser.YOUNGLING){
        throw new UnauthorizedException("Youngling  não pode ter nave.")
      }
      ship.user = newUser;
    }
      
    ship.name = updates.name.toLowerCase()
   
    return await this.shipRepository.save(ship);
    } catch(error){
      throw(error)
    }

  }


  async delete(systemId: string){
    try{

    await this.findOne(systemId)   
         
      
    return await this.shipRepository.delete(systemId);

    }
    catch(error){
      throw(error)
    }
  }


}