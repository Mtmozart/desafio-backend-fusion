import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSystemDto {
  
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  galaxyId: string;
}