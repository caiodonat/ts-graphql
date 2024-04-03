import { IUserFilters } from "../model/user/filter-user.dto";
import User from "../model/user/user.entity";
import { Arg, Args, ArgsType, Query, Resolver } from "type-graphql";


interface IProvider {
	users: User[]
}

@Resolver(() => User)
export class UserResolver {

	private fakeDb: IProvider = {
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

	@Query(returns => [User])
	public async users(): Promise<User[]> {

		return await this.fakeDb.users;
	}

	@Query(returns => [User])
	public usersWithFilter(
		// @Arg("filters", { nullable: true }) filters?: IUserFilters
		@Args() { id, name, email }: IUserFilters
	): User[] {

		console.debug(id, name, email);

		return this.fakeDb.users;
	}

}