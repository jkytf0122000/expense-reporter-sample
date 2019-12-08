import { Sequelize, Model, DataTypes } from 'sequelize';
import { Expense } from './expense';
import { Role } from './role';

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

class User extends Model {
  public id!: string;
  public boss_id?: string;
  public first_name?: string;
  public last_name!: string;
  public email!: string;
  public hash?: string;
  public deleted_at?: Date;
  public readonly careated_at!: Date;
  public readonly updated_at!: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    validate: {
      isUUID: 4
    }
  },
  boss_id: {
    type: DataTypes.UUID
  },
  first_name: {
    type: DataTypes.STRING(32)
  },
  last_name: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  hash: {
    type: DataTypes.STRING(256)
  },
  deleted_at: {
    type: DataTypes.DATE,
    defaultValue: null
  },
}, {
  tableName: 'users',
  underscored: true,
  sequelize: sequelize
}
);

User.hasMany(Role, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'roles'
})

User.hasMany(Expense, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'expenses'
});

User.hasOne(User, {
  sourceKey: 'id',
  foreignKey: 'boss_id',
  as: 'users'
});

export { User };