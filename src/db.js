const { Prisma } = require('prisma-binding');
const config = require('../config');

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: config.prismaEndpoint,
  secret: config.prismaSecret,
  debug: config.env === 'development',
});

module.exports = db;
