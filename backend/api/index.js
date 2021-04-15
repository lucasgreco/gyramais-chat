const { ApolloServer } = require('apollo-server');

// importação dos typeDefs e Resolvers do Apollo Server
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

//conectar com banco de dados.
const mongoose = require("mongoose");
const uri = "mongodb+srv://lucasgreco:gyramaisadmin@cluster0.xsivq.mongodb.net/gyramais?retryWrites=true&w=majority";
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 };

 //conectar com MongoDB cloud
mongoose
    .connect(uri,dbOptions)
    .then( () => console.log("database connected") )
    .catch( (error) => console.log("Database failed: ", error) )


// subindo seridor apollo
const server = new ApolloServer( { typeDefs,resolvers});
server
    .listen()
    .then(({url})=> console.log(`servidor rodando na porta ${url}`))
    .catch( (error) => console.log("server failed: ", error));