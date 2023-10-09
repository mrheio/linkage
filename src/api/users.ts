import { NextRequest } from 'next/server';
import { usersService } from '~/services';
import { ApiError, ApiSuccess } from './responses';

const getUsers = async (request: NextRequest) => {
	const users = await usersService.getUsers();
	return ApiSuccess.getMany(users).toNextResponse();
};

const patchUser = async (
	request: NextRequest,
	context: { params: { uid: string } },
) => {
	const { uid } = context.params;
	const data = await request.json();

	try {
		await usersService.updateUser(uid, data);
		return ApiSuccess.updated().toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const deleteUser = async (
	request: NextRequest,
	ctx: { params: { uid: string } },
) => {
	const { uid } = ctx.params;

	try {
		const now = new Date().toISOString();
		// update the <deleted_at> column (DO NOT DELETE IT FROM DATABASE)
		await usersService.updateUser(uid, {
			deleted_at: now,
		});
		return ApiSuccess.deleted().toNoContentResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const usersAPI = {
	GET: { MANY: getUsers },
	PATCH: patchUser,
	DELETE: deleteUser,
};
