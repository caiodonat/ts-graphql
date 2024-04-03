import { Field, InputType } from "type-graphql"
import User from "./user.entity";

@InputType()
export class UserInput implements Omit<User, "id"> {

	@Field()
	public name!: string;

	@Field()
	public email!: string;
}