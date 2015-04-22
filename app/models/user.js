let UserSchema = {
  name: String,
  password: String,
  email: {type: 'text', unique: true, lowercase: true},
};

let options = {
  collection: 'users',
  methods: {
    serialize: () => {
      return {
        name: this.name,
        email: this.email,
        createdAt : moment(this.createdAt).fromNow()
      }
    }
  }
}

let UserModel = db => db.define("user", UserSchema, options);

export default UserModel;