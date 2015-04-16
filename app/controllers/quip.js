import mongoose from 'mongoose';
const Quip = mongoose.model('Quip');
  , 

/*
 * GET users listing.
 */

export function index (req, res) {

};

export function create (req, res) {
  res.send(Quip.create({ quip: req.quip }));
};