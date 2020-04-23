const StateQueries = require('./Queries/StateQueries');
const TimeLineQueries = require('./Queries/TimeLineQueries');
const StatQueries = require('./Queries/StatQueries');

const Query = {
  ...StateQueries,
  ...TimeLineQueries,
  ...StatQueries,
};

module.exports = Query;
