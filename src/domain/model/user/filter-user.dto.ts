import { ArgsType, Field, Int, ObjectType } from "type-graphql";
import User from "./user.entity";
import { Prisma } from "@prisma/client";

export type { User as IUserDb } from '@prisma/client';
type UserDbWhere = Prisma.UserWhereInput;
export type IUserDbWhere = UserDbWhere;

@ArgsType()
export class IUserFilters implements UserDbWhere {

	@Field(type => String, { nullable: true })
	id?: string;

	@Field(type => String, { nullable: true })
	name?: string;

	@Field(type => String, { nullable: true })
	email?: string;

}

// export type UserDbIncludes = Prisma.UserInclude;


/** _Usuário_ indo do banco de dados com inclusões */
export type UserDbWithIncludes = Prisma.UserGetPayload<{ /* include: UserDbIncludes */ }>;
