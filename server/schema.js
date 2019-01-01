const { buildSchema } = require('graphql')


module.exports = buildSchema(`
    type Work {
        _id: ID!
        dateWork: String!
        toDoList: [ToDoElement!]!
        creator: User!
    }

    type ToDoElement {
        toDo: String!
        completed: Boolean
    }
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        works: [Work!]!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input ToDoObj {
        toDo: String!
        completed: Boolean
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    input WorkInputData {
        dateWork: String!
        toDoList: [ToDoObj!]
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createWork(workInput: WorkInputData): Work!
        updateWork(dateWork: String!, workInput: WorkInputData): Work!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        works(creator: String!): [Work!]
        work(dateWork: String!): Work!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);