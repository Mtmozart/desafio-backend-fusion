
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { SystemEntity } from "../entity/system.entity";
import { UserEntity } from "src/modules/users/entity/user";

export function validation(system: SystemEntity, user: UserEntity){


  if(!user){
    throw new BadRequestException("Usuário não encontrado.")
  }

  if(system.user.id != user.id){
    throw new UnauthorizedException("Sem autorização para deletar o planeta.")
  }

}