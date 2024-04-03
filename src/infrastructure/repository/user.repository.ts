import type { PrismaClient } from "@prisma/client";
import PrismaClientPool from '../database/prisma/PrismaClient';
import User, { IUserDb } from "../../domain/model/user/user.entity";
import { UserInput } from "../../domain/model/user/create-user.dto";
import { IUserFilters, IUserDbWhere } from "src/domain/model/user/filter-user.dto";

export default class UserRepository {

	private readonly _prisma: PrismaClient;

	constructor() {
		this._prisma = PrismaClientPool;
	}

	public async insertUsers(newEntity: UserInput): Promise<IUserDb> {
		return await this._prisma.user.create({
			data: newEntity
		});
	}

	public async selectManyUsers(input?: IUserFilters): Promise<IUserDb[]> {
		return await this._prisma.user.findMany({
			where: input
		});
	}

	public async selectUser(id: User['id']): Promise<IUserDb | null> {
		return await this._prisma.user.findUnique({
			where: {
				id: id
			}
		});
	}

	public async updateUser(id: User['id']): Promise<IUserDb | null> {
		return await this._prisma.user.findUnique({
			where: {
				id: id
			}
		});
	}

}