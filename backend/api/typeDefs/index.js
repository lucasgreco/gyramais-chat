const query = require("./query");
const mutation = require("./mutation");
const types = require("./types");

const typeDefs = [query, mutation, types];

// exportando os typeDefs em uma unica variavel
module.exports = typeDefs;
