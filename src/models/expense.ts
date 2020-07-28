import { Sequelize, Model, DataTypes } from "sequelize";
import * as config from "../config/database";

export const sequelize: Sequelize = config.default();

class Expense extends Model {
  public id!: number;
  public user_name?: string;
  public user_id!: number;
  public date!: Date;
  public type!: string;
  public description?: string | null;
  public amount!: number;
  public approval!: number;
  public readonly careated_at!: Date;
  public readonly updated_at!: Date;
}

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING(256),
      defaultValue: "",
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "expenses",
    underscored: true,
    sequelize: sequelize,
  }
);

export { Expense };
