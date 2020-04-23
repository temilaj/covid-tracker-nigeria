const { forwardTo } = require('prisma-binding');

const CaseQueries = {
  case: forwardTo('db'),
  cases: forwardTo('db'),
  casesConnection: forwardTo('db'),
};

module.exports = CaseQueries;
