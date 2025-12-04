import { dbConfig } from './index';

const config = {
  development: {
    username: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database:   dbConfig.DB_NAME,
    host:     dbConfig.DB_HOST,
    dialect: 'mysql',
  }
}

export default config;