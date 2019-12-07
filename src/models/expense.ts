import { Sequelize, Model, DataTypes } from 'sequelize';
import { User_master } from './user_masters';

// todo: データベース接続を定義する Typescript モジュール
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
  const config_url: any = process.env[config.use_env_variable];
  sequelize = new Sequelize(config_url, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

class Expense extends Model {
  public id!: number;
  public user_name!: string;
  public user_id!: number;
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
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    //    allowNull: false,
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
  }
}, {
    tableName: 'expenses',
    underscored: true,
    sequelize: sequelize
  }
);

Expense.belongsTo(User_master, { targetKey: 'id' });

export { Expense };