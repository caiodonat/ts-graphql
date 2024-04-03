import User from "../model/user/user.entity";
import { Query, Resolver } from "type-graphql";


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

	@Query(() => [User])
	public async users(): Promise<User[]> {

		return await this.fakeDb.users;
	}

	@Query(() => [User])
	public async usersWithFilter(email: User['email']): Promise<User[]> {

		return await this.fakeDb.users;
	}

}