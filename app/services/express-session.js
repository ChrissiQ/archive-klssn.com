import redis from 'connect-redis';
import session from 'express-session';
import * as secret from '../config/secret';

let env = process.env.NODE_ENV || "development";
let config = secret[env];
let RedisStore = redis(session);

let redisSession = session({
  store: new RedisStore(config.redis),
  secret: config.session_secret,
  resave: true,
  saveUninitialized: true
});

export default redisSession;