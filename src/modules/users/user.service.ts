import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/CreateUserDto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}


  async create(createUserDto: CreateUserDto){
    try {
      const userExistsByEmail = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    
      if (userExistsByEmail) {
        throw new BadRequestException('Usuário já cadastrado.');
      }
      
    
      
    } catch (error) {      
      throw error; 
    }
    
  }
}
