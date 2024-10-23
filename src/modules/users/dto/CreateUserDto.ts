import { IsEmail, IsString, MinLength } from "class-validator";
import { TypeUser } from "../enum/typeUserEnum";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto{

  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  typeUser: TypeUser

}