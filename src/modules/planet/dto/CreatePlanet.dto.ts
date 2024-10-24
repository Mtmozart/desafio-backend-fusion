import { IsString, IsEnum } from "class-validator";
import { StarWarsFaction } from "../enum/starWarsFaction.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlanetDto {

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  systemId: string;

  @ApiProperty()
  @IsEnum(StarWarsFaction)
  faction: StarWarsFaction;
}
