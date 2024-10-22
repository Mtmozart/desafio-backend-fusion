import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/CreateUserDto";
import { hash, compare, genSalt } from 'bcrypt';

@Injectable()
export class UserService {
  private salt: number = 10;
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
        throw new ConflictException('Usuário já cadastrado.');
      }

      const user = new UserEntity();
      Object.assign(user, createUserDto);

      const salt = await genSalt(this.salt);
      user.password = await hash(createUserDto.password, salt)

      user.roles.push(createUserDto.typeUser.toString());
      
      return await this.userRepository.save(user);
            
    } catch (error) {      
      throw error; 
    }
     
  }

  async findOne(id: string): Promise<UserEntity>{
    try {
      const user = await this.userRepository.findOne({
        where:{ id: id}
      })

      if(!user){
        throw new BadRequestException("Usuário não encontrado.")
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string){
    try {
      const user = await this.findOne(id);

      if(!user){
        throw new BadRequestException("Usuário não encontrado.")
      }
      await this.userRepository.remove(user);
      return user;
    } catch (error) {
      throw error;
    }
  }
 
}
