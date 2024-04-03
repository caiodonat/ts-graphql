import "reflect-metadata"
import express from "express"
import { buildSchema } from "type-graphql"
import { createHandler } from "graphql-http/lib/use/express";
import { ApolloServer } from "apollo-server";
import path from "path";

import { resolvers } from "./infrastructure/database/prisma/generated/type-graphql";
import { UserResolver } from "./domain/resolver/user.resolver"
import { PrismaClient } from "@prisma/client";

// async function main() {
// 	console.time('Restart')

// 	const schema = await buildSchema({
// 		resolvers: resolvers,
// 		// resolvers: [UserResolver],
// 		validate: false,
// 		emitSchemaFile: path.resolve(__dirname, "../docs/generated-schema.graphql"),
// 	})

// 	const app = express()

// 	app.use(
// 		"/graphql",
// 		createHandler({
// 			schema: schema,
// 		})
// 	)

// 	app.listen(8000, () => {
// 		console.clear();
// 		console.timeEnd('Restart')
// 	});
// }

// main()

interface Context {
	prisma: PrismaClient;
  }

async function main() {
	const schema = await buildSchema({
		resolvers,
		emitSchemaFile: path.resolve(__dirname, "./generated-schema.graphql"),
		validate: false,
	});

	const prisma = new PrismaClient();
	await prisma.$connect();

	const server = new ApolloServer({
	  schema,
	  context: (): Context => ({ prisma }),
	});
	
	const { port } = await server.listen(4000);
	console.log(`GraphQL is listening on ${port}!`);

	const app = express()

	app.use(
		"/graphql",
		createHandler({
			schema: schema,
		})
	)

	app.listen(8000, () => {
		console.clear();
		// console.timeEnd('Restart')
	});

}

main().catch(console.error);