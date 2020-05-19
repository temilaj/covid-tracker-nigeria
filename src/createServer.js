const { GraphQLServer } = require('graphql-yoga');

const Query = require('./resolvers/Query');
const db = require('./db');
const cache = require('./redisClient');

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Query,
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db, cache }),
  });
}

module.exports = createServer;
