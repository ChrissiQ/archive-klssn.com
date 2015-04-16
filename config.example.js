import path from 'path';
const rootPath = path.resolve(__dirname + '../')

/**
 * Expose config
 */

 export var development = {
  root: rootPath,
  redis: { 
    host: 'localhost',
    port: 6379,
    db: 2,
    pass: 'RedisPASS'
  },
  session_secret: '1234asdf'
};

export var test = {
  root: rootPath,
  redis: { 
    host: 'localhost',
    port: 6379,
    db: 2,
    pass: 'RedisPASS'
  },
  session_secret: '1234asdf'
};

export var staging = {
  root: rootPath,
  redis: { 
    host: 'localhost',
    port: 6379,
    db: 2,
    pass: 'RedisPASS'
  },
  session_secret: '1234asdf'
};

export var production = {
  root: rootPath,
  redis: { 
    host: 'localhost',
    port: 6379,
    db: 2,
    pass: 'RedisPASS'
  },
  session_secret: '1234asdf'
};