import Sequelize from 'sequelize';
import generateRandomName from 'adjective-adjective-animal';
import config from '../config/sequelize';

let UserSchema = {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  uniqueId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /[A-Z][a-z]+[A-Z][a-z]+[A-Z][a-z]+/
    }
  }
};

let options = {
  indexes: [
    { fields: ['email'] },
    { fields: ['name'] }
  ],
  hooks: {
    beforeValidate: (user, options, fn) => {
      generateRandomName().then(name => {
        user.uniqueId = name;
        fn(null, user);
      });
    }
  },
  classMethods: {
    associate: models => {
      let User = models.user;
      let Role = models.role;
      User.belongsToMany(Role, {through: 'users_roles'});
    },
    cFindAll: function () { return this.findAll(config.findOptions) },
    cFindBy: function (where) {
      let whereOpts = Object.assign({where: where}, config.findOptions);
      return this.find(whereOpts);
    }
  },
  instanceMethods: {
    getRoleNames: function () {
      return this.roles.map(role => role.name);
    },
    IsAdmin: function () {
      return this.roles.some(role => role.name === 'admin');
    }
  }
};

let UserModel = db => db.define('user', UserSchema, options);

export default UserModel;