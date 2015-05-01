import Sequelize from 'sequelize';

let PostDetailSchema = {
  title: Sequelize.STRING,
  content: Sequelize.STRING
};

let options = {
  tableName: 'postdetails',
  classMethods: {
    associate: models => {
      let Post = models.post;
      let Detail = models.postDetail;
      let User = models.user;
      Detail.belongsTo(Post);
      Detail.belongsTo(User, {
        as: 'UpdatedByUser',
        foreignKey: 'updatedByUserId'
      });
    }
  }
};

let PostModel = db => db.define('postDetail', PostDetailSchema, options);

export default PostModel;