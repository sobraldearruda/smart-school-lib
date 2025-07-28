import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user';

export class Librarian extends User {
  public userId!: number;
  public userName!: string;
  public userEmail!: string;
  public userRegistration!: string;
  public userPassword!: string;

  public setLibrarians!: (librarians: number[] | Librarian[] | null, options?: any) => Promise<void>;
  public getLibrarians!: () => Promise<Librarian[]>;
  public addLibrarian!: (librarian: Librarian | number) => Promise<void>;
  public addLibrarians!: (librarians: Librarian[] | number[]) => Promise<void>;
  public removeLibrarian!: (librarian: Librarian | number) => Promise<void>;
  public hasLibrarian!: (librarian: Librarian | number) => Promise<boolean>;
}

Librarian.init(
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
    tableName: 'librarians',
    timestamps: false,
  }
);
