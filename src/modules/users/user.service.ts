import { UpdateUserDto } from './dto/UpdateUserDto';
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/CreateUserDto";
import hashPassword from 'src/utils/hashedPassword';

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
        throw new ConflictException('Usuário já cadastrado.');
      }
      const user = new UserEntity();
      Object.assign(user, createUserDto);      

      user.password = await hashPassword(createUserDto.password);
      user.roles = [];
      user.roles.push(createUserDto.typeUser);
      user.email.toLowerCase()
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


  async update (update: UpdateUserDto, id: string){
   try {
    const user = await this.findOne(id);

    const newUser = { ...user, ...update };
      if (update.email) {
        if(update.email !== user.email){
          const verificationIfUserExists = await this.userRepository.findOne({
            where: { email: update.email },
          });
          if(verificationIfUserExists){
            throw new ConflictException("E-mail cadastrado.")
          }
        }  
        newUser.email.toLowerCase()   
      }
      if(update.password){
        newUser.password = await hashPassword(update.password);
      }
    
      return this.userRepository.save(newUser);
   } catch (error) {
      throw error;
   }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
        return await this.userRepository.find();
    } catch (error) {
        throw error;
    }
  }

  async findByEmail(email: string): Promise<UserEntity>{
    try {
      const user = await this.userRepository.findOne({
        where:{ email: email}
      })

      if(!user){
        throw new BadRequestException("Usuário não encontrado.")
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }
}
 

