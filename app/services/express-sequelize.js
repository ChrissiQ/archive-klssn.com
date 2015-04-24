export default (sequelize, models) => {
  return (req, res, next) => {
    req.sequelize = sequelize;
    req.models = models;
    next();
  };
};