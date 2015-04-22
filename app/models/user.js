let UserSchema = {
  name: String,
  password: String,
  email: {type: 'text', unique: true, lowercase: true},
};

let UserModel = db => db.define("user", UserSchema, {collection: 'users'});

export default UserModel;