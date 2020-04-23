const depthLimit = require('graphql-depth-limit');
const { default: costAnalysis } = require('graphql-cost-analysis');
const { formatError } = require('apollo-errors');
const compression = require('compression');

require('dotenv').config({});

const createServer = require('./createServer');
const server = createServer();

server.express.use(compression());

const config = require('../config');

server.express.get('/api/status', (req, res) => {
  return res.status(200).json({ isActive: true });
});

server.start(
  {
    cors: {
      credentials: true,
      origin: config.frontEndURL,
    },
    playground: '/',
    introspection: config.env === 'development',
    validationRules: req => [
      depthLimit(3),
      costAnalysis({
        variables: req.body.variables,
        maximumCost: 50,
        defaultCost: 1,
        onComplete(cost) {
          console.info(`Cost analysis score: ${cost}`);
        },
      }),
    ],
    formatError,
  },
  configuration => {
    console.info(`Server is now running on port http://localhost:${configuration.port}`);
  },
);
