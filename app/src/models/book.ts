import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Author } from "../models/author";

export interface BookAttributes {
  bookId: number;
  bookTitle: string;
  bookIsbn: string;
  bookPublicationYear: string;
}

export interface BookCreationAttributes extends Omit<BookAttributes, "bookId"> {}

export class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public bookId!: number;
  public bookTitle!: string;
  public bookIsbn!: string;
  public bookPublicationYear!: string;
  public bookAuthors?: Author[];

  public setAuthors!: (authors: number[] | Author[] | null, options?: any) => Promise<void>;
  public getAuthors!: () => Promise<Author[]>;
  public addAuthor!: (author: Author | number) => Promise<void>;
  public addAuthors!: (authors: Author[] | number[]) => Promise<void>;
  public removeAuthor!: (author: Author | number) => Promise<void>;
  public hasAuthor!: (author: Author | number) => Promise<boolean>;
}

Book.init(
  {
    bookId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bookIsbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bookPublicationYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "books",
    timestamps: false,
  }
);
