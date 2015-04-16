import mongoose from 'mongoose';
const Schema = mongoose.Schema;

console.log("Loading quips.");

/**
 * Block schema
 */

const QuipSchema = new Schema({
  quip: {type : String},
  views: {type : Number, default: 0},
  createdAt: {type : Date, default : Date.now}
});

QuipSchema.methods = {

  //save: function()

};

QuipSchema.statics.random = function(cb) {
  this.count(function(err, count) {

    if (err)
      return cb(err);

    let rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(cb);

  }.bind(this));

};

mongoose.model('Quip', QuipSchema);