import sequelize from './sequelize';
import models from '../models';

let db = models(sequelize);

let setup = (req, res, next) => {
  req.sequelize = sequelize;
  req.models = db;
  sequelize.sync()
    .then(() => next())
    .catch(err => console.error(err));
};

export default setup;