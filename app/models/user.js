import Sequelize from 'sequelize';

let UserSchema = {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  name: Sequelize.STRING
};

let options = {
  classMethods: {
    associate: models => {
      let User = models.user;
      let Role = models.role;
      User.belongsToMany(Role, {through: 'users_roles'});
    }
  }
};

let UserModel = db => db.define('user', UserSchema, options);

export default UserModel;