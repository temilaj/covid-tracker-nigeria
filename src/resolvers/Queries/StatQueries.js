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
    return result;
  },
};

module.exports = StatQueries;
