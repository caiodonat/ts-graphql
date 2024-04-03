import { Field, ObjectType } from "type-graphql";
export type { User as IUserDb } from '@prisma/client';


@ObjectType()
export default class User {

	@Field()
	public id!: string;

	@Field()
	public name!: string;

	@Field()
	public email!: string;

}

