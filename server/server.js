const express = require('express');
const express_graphql = require('express-graphql');
const schema = require('./schema')
const root = require('./resolvers')
// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(8080)