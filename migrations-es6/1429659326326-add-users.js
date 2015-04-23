import orm from 'orm';
import UserModel from '../app/models/user';
import {development as secret} from '../app/config/secret';

export function up (next) {
  orm.connect(secret.database, (err, db) => {
    let User = UserModel(db);
    User.drop(
      () => User.sync(
        () => next()
      )
    );
  });
};

export function down(next) {
  orm.connect(secret.database, (err, db) => {
    let User = UserModel(db);
    User.drop(
      () => next()
    );
  });
};
