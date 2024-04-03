
import { graphql, buildSchema } from 'graphql';
import express from 'express';
import {createHandler } from "graphql-http";

const app = express();

interface IUser {
  id: number;
  name: string
  repo: string
  age: number
}

interface IProvider {
  users: IUser[]
}

interface findUser {
  id: IUser['id'];
}

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type User {
    id: ID
    name: String
    repo: String
    age: Int
  }
  type Query {
    user(id: ID!): User
    users: [User]
  }
  type Mutation {
    createUser(name: String!, repo: String!, age: Int!): User
  }
`);

// The rootValue provides a resolver function for each API endpoint
const providers: IProvider = {
  users: []
};

// Run the GraphQL query '{ hello }' and print out the response
let id = 0;

const resolvers = {
  user({ id }: IUser) {
    return providers.users.find(item => item.id === Number(id));
  },
  users() {
    return providers.users;
  },
  createUser({ name, repo, age }: IUser) {
    const user = {
      id: id++,
      name,
      repo,
      age
    };

    providers.users.push(user);

    return user;
  }
};

app.use(
  "/graphql",
  createHandler({
    schema,
    rootValue: resolvers,
    // graphql: true
  })
);

app.listen(3000);
