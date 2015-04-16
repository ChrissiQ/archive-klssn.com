import mongoose from 'mongoose';
const Schema = mongoose.Schema;

console.log("loading user.");

/**
 * User schema
 */

let UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.method({

  save: function(req,res){
      console.log("Saving user.");
  }

});

/**
 * Statics
 */

UserSchema.static({

});

/**
 * Register
 */

mongoose.model('User', UserSchema);