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
      user: 'bebec61bcb73f0',
      password: '6d17d324',
      database: 'heroku_98ceba80eed9ec3',
    },
  },
});
