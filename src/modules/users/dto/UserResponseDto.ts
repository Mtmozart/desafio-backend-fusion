import { UserEntity } from 'src/modules/users/entity/user';
export class UserResponseDto {

  private id: string;
  private name: string;
  private email: string;
  private type: string;
  private created_at: Date;
  private update_at: Date;

  constructor(user: UserEntity){
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.type = user.typeUser.toString()
    this.created_at = user.createdAt
    this.update_at = user.updatedAt
  }
}