var config = {
  port: 8080,

  db: {
    host: 'localhost',
    database: 'users-node',
    user: 'danil',
    password: '123',

    forcing: false // create tables every node start ?
  },
  auth: {
    salt: 'mysalt.v1'
  }
};

module.exports = config;