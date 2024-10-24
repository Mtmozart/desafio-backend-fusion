import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGalaxyDto {

  @ApiProperty()
  @IsString()
  name: string;

  
}