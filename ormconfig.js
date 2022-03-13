const applicationUrl = new URL(process.env.DATABASE_URL);
const useSsl = !!process.env.DATABASE_USE_SSL;

module.exports = [
  {
    type: 'postgres',
    host: applicationUrl.hostname,
    port: applicationUrl.port,
    username: applicationUrl.username,
    password: applicationUrl.password,
    database: applicationUrl.pathname.replace('/', ''),
    synchronize: false,
    logging: false,
    entities: ['src/database/entity/**/*.ts'],
    migrations: ['src/database/migration/**/*.ts'],
    subscribers: ['src/database/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/database/entity',
      migrationsDir: 'src/database/migration',
      subscribersDir: 'src/database/subscriber',
    },
    extra: {
      ssl: useSsl
        ? {
            rejectUnauthorized: false,
          }
        : false,
    },
  },
];
