import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateShipDto {

  @ApiProperty()
  @IsString()
  name: string;

}