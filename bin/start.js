#!/usr/bin/env node

import socketio from 'socket.io';
import server from './server';
import fs from 'fs';
import path from 'path';
import mongoose  from 'mongoose';
import { development as config } from '../config';

// Connect to mongodb
mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', err => console.error(`connection error: ${err}`));
db.on('disconnected', () => mongoose.connect(config.db));
db.on('open', () => {

  // Bootstrap models
  for (let file of fs.readdirSync(path.join(__dirname, '../app/models')))
    if (~file.indexOf('.js'))
      require(path.join(__dirname, '../app/models/', file));

  let Block = mongoose.model('Block');

  // Receive socket.io requests and respond with blocks

  socketio(server).on('connection', socket => {
    socket.on('newBlock', data => {

      Block.findOne( { x:data.x, y:data.y }, (err,block) => {

        let emitNewBlock = (err,block) => io.sockets.emit('newBlock', block);

        if (!block)
          Block.create(data, emitNewBlock);
        else {
          delete data._id;
          Block.findByIdAndUpdate(block._id, data, emitNewBlock);
        }

      });
    });
  });
});