import Sequelize from 'sequelize';

let UserSchema = {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  name: Sequelize.STRING
};

let options = {};

let UserModel = db => db.define('user', UserSchema, options);

export default UserModel;