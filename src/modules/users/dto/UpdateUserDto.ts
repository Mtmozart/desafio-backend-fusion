import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { TypeUser } from "../enum/typeUserEnum";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateUserDto{

  @IsString()
  @ApiProperty()
  @IsOptional()
  name: string;

  @IsEmail()
  @ApiProperty()
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  @IsOptional()
  password: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  typeUser: TypeUser

}