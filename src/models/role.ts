import { Sequelize, Model, DataTypes } from 'sequelize';
import * as config from '../config/database';

const sequelize:Sequelize = config.default();

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