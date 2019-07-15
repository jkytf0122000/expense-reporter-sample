import { Sequelize, Model, DataTypes } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

class Expense extends Model {
  public id!: number;
  public user_name!: string;
  public date!: Date;
  public type!: string;
  public description!: string | null;
  public amount!: number;
  public readonly careated_at!: Date;
  public readonly updated_at!: Date;
}

Expense.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_name: {
    type: DataTypes.STRING(256),
    allowNull: false,
    defaultValue: ''
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  },
  amount: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
    tableName: 'expenses',
    underscored: true,
    sequelize: sequelize
  });

export { Expense };