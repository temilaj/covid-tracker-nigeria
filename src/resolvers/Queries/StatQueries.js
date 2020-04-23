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
};

module.exports = StatQueries;
