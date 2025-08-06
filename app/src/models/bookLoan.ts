import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class BookLoan extends Model {
  public loanId!: number;
  public loanDate!: Date;
  public returnDate!: Date;
  public userId!: number;
  public bookId!: number;
}

BookLoan.init(
  {
    loanId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    loanDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'book_loans',
    timestamps: false,
  }
);
