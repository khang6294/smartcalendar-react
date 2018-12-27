const express = require('express');
const express_graphql = require('express-graphql');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080;
const schema = require('./schema')
const root = require('./resolvers')
const app = express();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
});

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