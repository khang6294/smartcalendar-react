const express = require('express');
const express_graphql = require('express-graphql');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const auth = require('./middleware/auth')
const path = require('path')
const helmet = require('helmet');
const compression = require('compression')
const port = process.env.PORT || 8080;
const schema = require('./schema')
const root = require('./resolvers')
const app = express();
const MONGODB_URI = 
`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0-g4j7c.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true`
app.use(bodyParser.json()); // application/json
app.use(helmet()); //secure response header
app.use(compression()); // compressing assests
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, ".." ,'/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname , ".." , '/build/index.html'))
})

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

app.use(auth)
// handling errors
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

// Create an express server and a GraphQL endpoint
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
    formatError(err) {
        if (!err.originalError) {
          return err;
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occurred.';
        const code = err.originalError.code || 500;
        return { message: message, statusCode: code, data: data };
    }
}));

//Database connection
mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(port)
    })
    .catch(err => console.log(err))