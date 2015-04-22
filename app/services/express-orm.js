import orm from 'orm';
import {development as secret} from '../config/secret';
import UserModel from '../models/user';

let define = (db, models, next) => {
  models.user = UserModel(db);
  next();
};

let assign = {define: define};

let setup = orm.express(secret.database, assign);

export default setup;