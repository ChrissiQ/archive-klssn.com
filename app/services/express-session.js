import redis from 'connect-redis';
import session from 'express-session';
import secret from '../config/secret';

let RedisStore = redis(session);

let redisSession = session({
  store: new RedisStore(secret.redis),
  secret: secret.session_secret,
  resave: true,
  saveUninitialized: true
});

export default redisSession;