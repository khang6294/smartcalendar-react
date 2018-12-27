const { buildSchema } = require('graphql')


module.exports = buildSchema(`
    type Work {
        _id: ID!
        dateWork: String!
        toDo: [String!]!
        creator: User!
    }
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        works: [Work!]!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    input WorkInputData {
        dateWork: String!
        toDo: [String!]
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createWork(workInput: WorkInputData): Work!
    }

    type RootQuery {
        hello: String!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);