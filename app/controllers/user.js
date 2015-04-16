import mongoose from 'mongoose';

/*
 * GET users listing.
 */

export function list (req, res) {
  res.send("respond with a resource");
};

export function index (req, res) {
  res.send("");
  User = mongoose.model('User');
  console.log(User);
};