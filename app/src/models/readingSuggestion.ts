import { Association, BelongsToManyAddAssociationsMixin, BelongsToManyGetAssociationsMixin, BelongsToManySetAssociationsMixin, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Book } from './book';

export class ReadingSuggestion extends Model {
  public suggestionId!: number;
  public studentId!: number;

  public setBooks!: BelongsToManySetAssociationsMixin<Book, number>;
  public getBooks!: BelongsToManyGetAssociationsMixin<Book>;
  public addBooks!: BelongsToManyAddAssociationsMixin<Book, number>;

  public static associations: {
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
  },
  {
    sequelize,
    tableName: 'reading_suggestions',
    timestamps: false,
  }
);
