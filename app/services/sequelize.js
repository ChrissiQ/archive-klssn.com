import Sequelize from 'sequelize';
import * as secret from '../config/secret';

let env = process.env.NODE_ENV || "development";
let config = secret[env];
let sequelize = new Sequelize(config.databaseString);
export default sequelize;