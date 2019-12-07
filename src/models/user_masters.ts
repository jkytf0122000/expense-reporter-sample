import { Sequelize, Model, DataTypes } from 'sequelize';
import { Expense } from './expense';

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

class User_master extends Model {
  public id!: number;
  public readonly careated_at!: Date;
  public readonly updated_at!: Date;
}

User_master.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  }
}, {
    tableName: 'user_masters',
    underscored: true,
    sequelize: sequelize
  }
);

User_master.hasMany(Expense, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'expenses'
});

export { User_master };