import "reflect-metadata"
import { buildSchema } from "type-graphql"
import express from "express"
import { createHandler } from "graphql-http/lib/use/express";

// import { UserResolver } from "resolver/user.resolver"
import { UserResolver } from "./domain/resolver/user.resolver"

async function main() {
	console.time('Restart')

	const schema = await buildSchema({
		resolvers: [UserResolver],
		validate: false,
		emitSchemaFile: true,
	})

	const app = express()

	app.use(
		"/graphql",
		createHandler({
			schema: schema,
		})
	)

	app.listen(8000, () => {
		console.clear();
		console.timeEnd('Restart')
	});
}

main()
