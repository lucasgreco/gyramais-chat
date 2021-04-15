const messageResolver = require("./messageResolver");
const userResolver = require("./userResolver");

// exportando os resolvers em uma variavel.
const resolvers = [messageResolver,userResolver];

module.exports = resolvers;
