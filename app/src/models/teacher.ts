import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user';

export class Teacher extends User {
  public userId!: number;
  public userName!: string;
  public userEmail!: string;
  public userRegistration!: string;
}

Teacher.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userRegistration: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'teachers',
    timestamps: false,
  }
);
