const { forwardTo } = require('prisma-binding');

const StateQueries = {
  state: forwardTo('db'),
  states: forwardTo('db'),
  statesConnection: forwardTo('db'),
};

module.exports = StateQueries;
