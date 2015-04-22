 export let userModel = {
  name: String,
  password: String,
  email: {type: 'text', unique: true, lowercase: true},
};

export let userModelOptions = {
  collection: 'users'
};