import userModel from '../app/models/user';
import {development as config} from '../config';
import orm from 'orm';

export function up (next) {
  orm.connect(config.database, (err, db) => {
    var User = db.define("user", userModel);
    User.drop(() => {
      console.log("Dropped users.");
      User.sync(() => {
        console.log("Synced users.");
        next();
      });
    });
  });
};

export function down(next) {
  orm.connect(config.database, (err, db) => {
    var User = db.define("user", userModel);
    User.drop(() => {
      console.log("Dropped users.");
      next();
    });
  });
};
