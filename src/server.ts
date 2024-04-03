import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
// import { ruruHTML } from "ruru/server";
// import { ruruHTML } from "ruru/dist/server";


interface IUser {
	id: number;
	name: string;
	email: string;
}

interface IProvider {
	users: IUser[]
}

let id: number = 2;

const fakeDb: IProvider = {
	users: [
		{
			id: 1,
			name: "Caio Donat",
			email: "cdonat@findes.org.br"
		},
		{
			id: 2,
			name: "Leonardo Sarmento",
			email: "lsarmento@findes.org.br"
		}
	]
};

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type User {
	id: Int
	name: String
	email: String
}
  type Query {
    hello: String
	helloById(id: Int!): Int
	users: [User]
	
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
	hello() {
		return "Hello world!"
	},
	helloById({ id }: IUser) {
		return ++id;
	},
	users() {
		return fakeDb.users;
	},
	createUser({ name, email }: IUser) {
		const user = {
			id: id++,
			name,
			email
		};

		fakeDb.users.push(user);

		return user;
	}
}

var app = express()

// Create and use the GraphQL handler.
app.use(
	"/graphql",
	createHandler({
		schema: schema,
		rootValue: root,
	})
)

// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")