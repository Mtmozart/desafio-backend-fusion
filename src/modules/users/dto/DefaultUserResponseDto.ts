import { UserEntity } from 'src/modules/users/entity/user';
export class DefaultResponseDto {

  private id: string;
  private name: string;
  private email: string;
  private type: string;

  constructor(user: UserEntity){
    this.id = user.id
    this.name = user.email
    this.email = user.email
    this.type = user.typeUser.toString()
  }
}