import { Sequelize } from 'sequelize';

export default function (): Sequelize {
  const env: string = process.env.NODE_ENV || 'development';
  const config: any = require('./config.json')[env];

  if (config.use_env_variable) {
    const config_url: any = process.env[config.use_env_variable];
    return new Sequelize(config_url, {
      timezone: '+09:00',  // JST タイムゾーン : Sequelize で SELECT すると全て UTC の ISO 形式になっており DB 上の記録と異なる
      logging: false,  // ログ出力
      // SSL 接続のため指定する (↓ 以下を追加した)
      dialect: 'postgres',
      dialectOptions: {
        ssl: true,
        rejectUnauthorized: false
      }
    });
  } else {
    return new Sequelize(config.database, config.username, config.password, {
      timezone: '+09:00',  // JST タイムゾーン : Sequelize で SELECT すると全て UTC の ISO 形式になっており DB 上の記録と異なる
      logging: false,  // ログ出力
      // SSL 接続のため指定する (↓ 以下を追加した)
      dialect: 'postgres',
      dialectOptions: {
        ssl: true,
        rejectUnauthorized: false
      }
    });
  }
}