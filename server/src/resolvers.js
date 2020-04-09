const { paginateResults } = require("./utils");

const resolvers = {
  Query: {
    // launches: async (_, { pageSize = 20, after }, { dataSources }) => {
    launches: async function (parent, { after, pageSize = 20 }, context, info) {
      const allLaunches = await context.dataSources.launchAPI.getAllLaunches();
      // we want these in reverse chronological order
      allLaunches.reverse();
      const launches = paginateResults({
        after,
        pageSize,
        results: allLaunches,
      });
      return {
        launches,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: launches.length
          ? launches[launches.length - 1].cursor !== allLaunches[allLaunches.length - 1].cursor
          : false,
      };
    },

    launch: function (parent, args, context, info) {
      return context.dataSources.launchAPI.getLaunchById({ launchId: args.id });
    },

    me: async function (parent, args, context, info) {
      return context.dataSources.userAPI.findOrCreateUser();
    },
  },

  Mission: {
    // make sure the default size is 'large' in case user doesn't specify
    missionPatch: function (parent, args = { size: "LARGE" }, context, info) {
      return args.size === "SMALL" ? parent.missionPatchSmall : parent.missionPatchLarge;
    },
  },

  Launch: {
    isBooked: async function (parent, args, context, info) {
      return context.dataSources.userAPI.isBookedOnLaunch({ launchId: parent.id });
    },
  },

  User: {
    trips: async function (parent, args, context, info) {
      // get ids of launches by user
      const launchIds = await context.dataSources.userAPI.getLaunchIdsByUser();

      if (!launchIds.length) return [];

      // look up those launches by their ids
      return context.dataSources.launchAPI.getLaunchesByIds({ launchIds }) || [];
    },
  },

  Mutation: {
    login: async function (parent, args, context, info) {
      const user = await context.dataSources.userAPI.findOrCreateUser({ email: args.email });
      if (user) return Buffer.from(args.email).toString("base64");
      else return null;
    },

    bookTrips: async function (parent, args, context, info) {
      const results = await context.dataSources.userAPI.bookTrips({ launchIds: args.launchIds });
      const launches = await context.dataSources.launchAPI.getLaunchesByIds({
        launchIds: args.launchIds,
      });

      return {
        success: results && results.length === args.launchIds.length,
        message:
          results.length === args.launchIds.length
            ? "trips booked successfully"
            : `the following launches couldn't be booked: ${args.launchIds.filter(
                (id) => !results.includes(id)
              )}`,
        launches,
      };
    },

    cancelTrip: async function (parent, args, context, info) {
      const result = await context.dataSources.userAPI.cancelTrip({ launchId: args.launchId });
      if (!result) return { success: false, message: "failed to cancel trip" };

      const launch = await context.dataSources.launchAPI.getLaunchById({ launchId: args.launchId });
      return { success: true, message: "trip cancelled", launches: [launch] };
    },
  },
};

module.exports = resolvers;
