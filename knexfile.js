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
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_USER,
    },
  },
});
