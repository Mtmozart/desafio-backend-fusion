import { UserEntity } from "src/modules/users/entity/user";
import { GalaxyEntity } from "../entity/galaxy.entity";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";

export function validation(galaxy: GalaxyEntity, user: UserEntity){

  if(!user){
    throw new BadRequestException("Usuário não encontrado.")
  }

  if(galaxy.user.id != user.id){
    throw new UnauthorizedException("Sem autorização para deletar o planeta.")
  }

}