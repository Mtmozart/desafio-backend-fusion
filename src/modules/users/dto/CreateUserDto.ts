import { IsEmail, IsString, MinLength } from "class-validator";
import { TypeUser } from "../enum/typeUserEnum";


export class CreateUserDto{

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  typeUser: TypeUser


}