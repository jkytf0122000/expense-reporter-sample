import { Sequelize, Model, DataTypes } from 'sequelize';

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

class Role extends Model {
  public id!: number;
  public user_id!: string;
  public name!: string;
  public readonly careated_at!: Date;
  public readonly updated_at!: Date;
}

Role.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4
    }
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
    defaultValue: ''
  }
}, {
  tableName: 'roles',
  underscored: true,
  sequelize: sequelize
});

export { Role };