 export default {
  name: String,
  password: String,
  email: {type: 'text', unique: true, lowercase: true}
};