import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user';

export class Student extends User {
  public userId!: number;
  public userName!: string;
  public userEmail!: string;
  public userRegistration!: string;
  public userPassword!: string;

  public setStudents!: (students: number[] | Student[] | null, options?: any) => Promise<void>;
  public getStudents!: () => Promise<Student[]>;
  public addStudent!: (student: Student | number) => Promise<void>;
  public addStudents!: (students: Student[] | number[]) => Promise<void>;
  public removeStudent!: (student: Student | number) => Promise<void>;
  public hasStudent!: (student: Student | number) => Promise<boolean>;
}

Student.init(
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
    tableName: 'students',
    timestamps: false,
  }
);
