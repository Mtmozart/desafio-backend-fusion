import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateSystemDto {
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

}