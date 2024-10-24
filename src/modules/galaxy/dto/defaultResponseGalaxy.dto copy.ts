import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DefaultResponseGalaxyDto {

  @ApiProperty()
  @IsString()
  name: string;

  
}