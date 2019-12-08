import { Sequelize } from 'sequelize';

export default function (): Sequelize {
  const env: string = process.env.NODE_ENV || 'development';
  const config: any = require('./config.json')[env];

  if (config.use_env_variable) {
    const config_url: any = process.env[config.use_env_variable];
    return new Sequelize(config_url, config);
  } else {
    return new Sequelize(config.database, config.username, config.password, config);
  }
}