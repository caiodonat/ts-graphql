import { ArgsType, Field, Int, ObjectType } from "type-graphql";

@ArgsType()
export class IUserFilters {

	@Field(type => Int, { nullable: true})
	id?: number;

	@Field(type => String, { nullable: true})
	name?: string;

	@Field(type => String, { nullable: true})
	email?: string;

}
