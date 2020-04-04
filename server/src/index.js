const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");

// noinspection JSCheckFunctionSignatures
const server = new ApolloServer({ typeDefs });

server.listen({ port: 3500 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
