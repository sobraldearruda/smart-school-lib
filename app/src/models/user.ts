import { Model } from 'sequelize';

export interface UserAttributes {
  userId: number;
  userName: string;
  userEmail: string;
  userRegistration: string;
  userPassword: string;
}

interface UserCreationAttributes {}

export abstract class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public userId!: number;
  public userName!: string;
  public userEmail!: string;
  public userRegistration!: string;
  public userPassword!: string;
}
