import { userModel } from '../app/models/user';
import { userModelOptions } from '../app/models/user';
import { development as config } from '../config';
import orm from 'orm';

export function up (next) {
  orm.connect(config.database, (err, db) => {
    let User = db.define("user", userModel, userModelOptions);
    User.drop(
      () => User.sync(
        () => next()
      )
    );
  });
};

export function down(next) {
  orm.connect(config.database, (err, db) => {
    let User = db.define("user", userModel, userModelOptions);
    User.drop(
      () => next()
    );
  });
};
