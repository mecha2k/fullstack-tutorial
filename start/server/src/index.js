const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");

// noinspection JSCheckFunctionSignatures
const server = new ApolloServer({ typeDefs });
