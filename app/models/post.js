import Sequelize from 'sequelize';
import config from '../config/sequelize';
  
let PostSchema = {
  uri: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
};

let options = {
  indexes: [
    { fields: ['uri'] }
  ],
  classMethods: {
    associate: models => {
      let User = models.user;
      let Post = models.post;
      let Detail = models.postDetail;
      Post.belongsTo(User);
      Post.hasMany(Detail);
      Post.belongsTo(Detail, {
        as: 'CurrentDetail',
        foreignKey: 'currentDetailId',
        constraints: false
      });
    },
    cFind: function(where, cb) {
      let whereOpts = Object.assign({where: where}, config.findOptions);
      return this[cb](whereOpts);
    },
    cFindAll: function (where = {}) { return this.cFind(where, "findAll") },
    cFindOne: function (where = {}) { return this.cFind(where, "find") }
  }
};

let PostModel = db => db.define('post', PostSchema, options);

export default PostModel;