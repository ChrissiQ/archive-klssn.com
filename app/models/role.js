import Sequelize from 'sequelize';

let RoleSchema = {
  name: Sequelize.STRING
};

let options = {
  classMethods: {
    associate: models => {
      let Role = models.role;
      let User = models.user;
      Role.belongsToMany(User, {through: 'users_roles'});
    }
  }
};

let RoleModel = db => db.define('role', RoleSchema, options);

export default RoleModel;