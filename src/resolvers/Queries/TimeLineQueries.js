const { forwardTo } = require('prisma-binding');

const TimeLineQueries = {
  timeline: forwardTo('db'),
  timelines: forwardTo('db'),
  timelinesConnection: forwardTo('db'),
};

module.exports = TimeLineQueries;
