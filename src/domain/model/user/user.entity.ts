import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class User {

	@Field()
	public id!: number;

	@Field()
	public name!: string;
	
	@Field()
	public email!: string;

}
