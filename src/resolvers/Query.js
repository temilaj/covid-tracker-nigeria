const StateQueries = require('./Queries/StateQueries');
const CaseQueries = require('./Queries/CaseQueries');

const Query = {
  ...StateQueries,
  ...CaseQueries,
};

module.exports = Query;
