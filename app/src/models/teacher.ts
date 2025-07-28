import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user';

export class Teacher extends User {
  public userId!: number;
  public userName!: string;
  public userEmail!: string;
  public userRegistration!: string;
  public userPassword!: string;

  public setTeachers!: (teachers: number[] | Teacher[] | null, options?: any) => Promise<void>;
  public getTeachers!: () => Promise<Teacher[]>;
  public addTeacher!: (teacher: Teacher | number) => Promise<void>;
  public addTeachers!: (teachers: Teacher[] | number[]) => Promise<void>;
  public removeTeacher!: (teacher: Teacher | number) => Promise<void>;
  public hasTeacher!: (teacher: Teacher | number) => Promise<boolean>;
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
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'teachers',
    timestamps: false,
  }
);
