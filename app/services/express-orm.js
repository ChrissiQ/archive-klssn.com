import orm from 'orm';
import UserModel from '../models/user';
import {development as secret} from '../config/secret';

let define = (db, models, next) => {
  models.user = UserModel(db);
  next();
};

let assign = {define: define};

let setup = orm.express(secret.database, assign);

export default setup;