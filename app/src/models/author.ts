import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface AuthorAttributes {
  authorId: number;
  authorName: string;
  authorBiography?: string;
}

interface AuthorCreationAttributes extends Optional<AuthorAttributes, "authorId"> {}

export class Author extends Model<AuthorAttributes, AuthorCreationAttributes> implements AuthorAttributes {
  public authorId!: number;
  public authorName!: string;
  public authorBiography?: string;
}

Author.init(
  {
    authorId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    authorBiography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "authors",
    timestamps: true,
  }
);
