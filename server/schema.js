const { buildSchema } = require('graphql')


module.exports = buildSchema(`
    type testData {
        text: String!
        view: Int!

    }
    type rootQuery {
        hello : testData
    }
    schema {
        query : rootQuery
    }
`);