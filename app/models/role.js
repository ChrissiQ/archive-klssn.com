import Sequelize from 'sequelize';

let RoleSchema = {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
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