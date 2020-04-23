const { forwardTo } = require('prisma-binding');

const StateQueries = {
  state: forwardTo('db'),
};

module.exports = StateQueries;
