function sortTimelines(timelines = []) {
  const sortedTimelines = timelines.reduce(
    (acc, timeline, index) => {
      acc.confirmed += timeline.confirmed;
      acc.recoveries += timeline.recoveries;
      acc.deaths += timeline.deaths;
      if (index === timelines.length - 1) {
        acc.lastUpdated = timeline.dateRecorded;
      }
      return acc;
    },
    { confirmed: 0, recoveries: 0, deaths: 0 },
  );
  return sortedTimelines;
}

function getResultByState(timelines = []) {
  const latest = timelines.reduce((acc, timeline, index) => {
    const { slug } = timeline.state;
    if (acc[slug] && acc[slug].confirmed >= 0) {
      acc[slug].confirmed += timeline.confirmed;
      acc[slug].recoveries += timeline.recoveries;
      acc[slug].deaths += timeline.deaths;
    } else {
      acc[slug] = {};
      acc[slug].confirmed = timeline.confirmed;
      acc[slug].recoveries = timeline.recoveries;
      acc[slug].deaths = timeline.deaths;
    }
    if (index === timelines.length - 1) {
      acc.lastUpdated = timeline.dateRecorded;
    }
    return acc;
  }, {});
  const result = [];
  Object.entries(latest).map(([key, value]) => {
    if (typeof value === 'object') {
      return result.push({ state: key, ...value });
    }
  });
  result.sort((a, b) => (a.confirmed > b.confirmed ? -1 : 1));
  return result;
}

const StatQueries = {
  async latest(parent, args, ctx, info) {
    const cachedTimelines = await ctx.cache.getData('timelines');
    if (cachedTimelines !== null) {
      console.info('getting data from cache');
      const latest = sortTimelines(JSON.parse(cachedTimelines));
      return latest;
    }
    console.info('getting data from Database');

    const dbTimelines = await ctx.db.query.timelines(
      { orderBy: 'dateRecorded_ASC' },
      '{ confirmed recoveries deaths dateRecorded state { slug } }',
    );
    ctx.cache.setData('timelines', 3600, JSON.stringify(dbTimelines));
    const latest = sortTimelines(dbTimelines);
    return latest;
  },

  async todaysCases(parent, args, ctx, info) {
    const cachedTimelines = await ctx.cache.getData('timelines');
    const last24Hours = new Date(Date.now() - 3600000 * 24);

    if (cachedTimelines !== null) {
      console.info('getting data from cache');

      const todaysCases = [];
      JSON.parse(cachedTimelines).forEach(timeline => {
        return new Date(timeline.dateRecorded) > last24Hours ? todaysCases.push(timeline) : null;
      });
      const result = sortTimelines(todaysCases);
      return result;
    }
    console.info('getting data from Database');

    const dbTimelines = await ctx.db.query.timelines({ where: { dateRecorded_gt: last24Hours } });
    if (dbTimelines.length > 0) {
      const result = sortTimelines(dbTimelines);
      return result;
    }
    return { confirmed: 0, recoveries: 0, deaths: 0 };
  },

  async resultsByState(parent, args, ctx, info) {
    const cachedTimelines = await ctx.cache.getData('timelines');
    if (cachedTimelines !== null) {
      console.info('getting data from cache');
      const result = getResultByState(JSON.parse(cachedTimelines));
      return result;
    }
    console.info('getting data from Database');

    const dbTimelines = await ctx.db.query.timelines(
      { orderBy: 'dateRecorded_ASC' },
      '{ confirmed recoveries deaths dateRecorded state { slug } }',
    );
    ctx.cache.setData('timelines', 3600, JSON.stringify(dbTimelines));
    const result = getResultByState(JSON.parse(cachedTimelines));
    return result;
  },
};

module.exports = StatQueries;
