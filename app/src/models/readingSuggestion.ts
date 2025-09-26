import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  DataTypes,
  Model,
} from "sequelize";
import sequelize from "../config/database";
import { Book } from "./book";
import { Teacher } from "./teacher";

export class ReadingSuggestion extends Model {
  public readingSuggestionId!: number;

  public teacherId!: number;
  public Teacher?: Teacher;
  public getTeacher!: BelongsToGetAssociationMixin<Teacher>;
  public setTeacher!: BelongsToSetAssociationMixin<Teacher, number>;

  public Books?: Book[];
  public setBooks!: BelongsToManySetAssociationsMixin<Book, number>;
  public getBooks!: BelongsToManyGetAssociationsMixin<Book>;
  public addBooks!: BelongsToManyAddAssociationsMixin<Book, number>;

  public static associations: {
    Teacher: Association<ReadingSuggestion, Teacher>;
    Books: Association<ReadingSuggestion, Book>;
  };
}

ReadingSuggestion.init(
  {
    suggestionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "teacherId",
      references: {
        model: "teachers",
        key: "userId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "reading_suggestions",
    timestamps: false,
  }
);
