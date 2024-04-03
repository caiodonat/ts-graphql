import { UserInput } from "../model/user/create-user.dto";
import UserRepository from "../../infrastructure/repository/user.repository";
import { IUserFilters, IUserDbWhere } from "../model/user/filter-user.dto";
import User from "../model/user/user.entity";
import { Arg, Args, ArgsType, Mutation, Query, Resolver } from "type-graphql";


@Resolver(() => User)
export class UserResolver {

	private readonly _repository: UserRepository;

	constructor() {
		this._repository = new UserRepository();

	}

	@Query(returns => [User])
	public async users(
		@Args() filters: IUserFilters
	): Promise<User[]> {

		return await this._repository.selectManyUsers(filters);
	}

	@Mutation(returns => User)
	async createUser(
		@Arg("input") input: UserInput
	): Promise<User> {
		const user = {
			id: this.users.length + 1,
			...input,
		}

		return await this._repository.insertUsers(input);
	}

	// @Mutation(returns => User)
	// async updateUser(
	// 	@Arg("id") id: User['id'],
	// 	@Arg("input") input: UserInput
	// ): Promise<User> {
	// 	const user = await this._repository.selectUser(id);

	// 	if (!user) {
	// 		throw new Error("User not found")
	// 	}

	// 	const updatedUser = {
	// 		...user,
	// 		...input,
	// 	}

	// 	this.users = this.users.map(u => (u.id === id ? updatedUser : u))

	// 	return updatedUser
	// }

}