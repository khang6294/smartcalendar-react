const express = require('express');
const express_graphql = require('express-graphql');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080;
const schema = require('./schema')
const root = require('./resolvers')
const app = express();

app.use(bodyParser.json()); // application/json
// Create an express server and a GraphQL endpoint
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

//Database connection
mongoose.connect('mongodb+srv://khang:GvVWiyfYeSZ889V@cluster0-g4j7c.mongodb.net/smartcalendar?retryWrites=true')
    .then(result => {
        app.listen(port)
    })
    .catch(err => console.log(err))