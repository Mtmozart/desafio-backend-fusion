import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateGalaxyDto {

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  
}