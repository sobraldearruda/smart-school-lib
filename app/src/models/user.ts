import { Model, Optional } from 'sequelize';

export interface UserAttributes {
  userId: number;
  userName: string;
  userEmail: string;
  userRegistration: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> {}

export abstract class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public userId!: number;
  public userName!: string;
  public userEmail!: string;
  public userRegistration!: string;
}
