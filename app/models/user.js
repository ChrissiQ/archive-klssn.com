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
  },
  instanceMethods: {
    getRoleNames: function() {
      return this.roles.map((currentValue, index, array) => {
        return currentValue.name;
      });
    },
    IsAdmin: function () {
      let roles = this.getRoleNames();
      for (var index in roles)
        if (roles[index] === 'admin')
          return true;
      return false;
    }
  }
};

let UserModel = db => db.define('user', UserSchema, options);

export default UserModel;