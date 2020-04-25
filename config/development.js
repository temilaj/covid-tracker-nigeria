module.exports = {
  env: 'development',
  port: process.env.PORT || 4000,
  frontEndURL: process.env.FRONTEND_URL,
  prismaSecret: process.env.PRISMA_SECRET,
  prismaEndpoint: process.env.PRISMA_ENDPOINT,
  appURL: process.env.APP_URL,
  secret: process.env.APP_SECRET,
  logLevel: process.env.LOGLEVEL,
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  },
};
