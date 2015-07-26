var config = {
  port: 8080,

  db: {
    host: 'localhost',
    database: 'users-node',
    user: 'danil',
    password: '123',

    forcing: false
  },
  auth: {
    salt: 'mysalt.v1'
  },
  view: {
    users: {
      perPage: 10
    }
  }
};

module.exports = config;