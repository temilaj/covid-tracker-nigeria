const StatQueries = {
  async latest(parent, args, ctx, info) {
    // TODO cache results in redis
    const timelines = await ctx.db.query.timelines({ orderBy: 'dateRecorded_ASC' });
    const latest = timelines.reduce(
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
    return latest;
  },

  async todaysCases(parent, args, ctx, info) {
    // TODO cache result
    const last24Hours = new Date(Date.now() - 3600000 * 24);
    const timelines = await ctx.db.query.timelines({ where: { dateRecorded_gt: last24Hours } });
    const todaysCases = timelines.reduce(
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
    return todaysCases;
  },

  async resultsByState(parent, args, ctx, info) {
    // TODO cache results in redis
    const timelines = await ctx.db.query.timelines(
      { orderBy: 'dateRecorded_ASC' },
      '{ confirmed recoveries deaths dateRecorded state { slug } }',
    );
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
    console.log(result);
    return result;
  },
};

module.exports = StatQueries;
