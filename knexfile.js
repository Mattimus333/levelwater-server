module.exports = ({

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'levelwater',
    },
  },
  test: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'levelwater',
    },
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_URL,
      user: 'b5067fc05aa3b5',
      password: '54bcc969',
      database: 'heroku_9b45cc2e4d4a16e',
    },
  },
});
