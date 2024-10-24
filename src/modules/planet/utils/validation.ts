import { UserEntity } from "src/modules/users/entity/user";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { PlanetEntity } from "../entity/planet.entity";

export function validation(planet: PlanetEntity, user: UserEntity){

  if(!user){
    throw new BadRequestException("Usuário não encontrado.")
  }

  if(planet.user.id != user.id){
    throw new UnauthorizedException("Sem autorização para deletar o planeta.")
  }

}