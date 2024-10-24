import { IsString, IsEnum, IsOptional } from "class-validator";
import { StarWarsFaction } from "../enum/starWarsFaction.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePlanetDto {

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsEnum(StarWarsFaction)
  @IsOptional()
  faction: StarWarsFaction;
}
