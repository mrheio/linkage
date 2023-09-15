import { NextRequest } from 'next/server';
import { usersService } from '~/services';
import { ApiError, ApiSuccess } from './responses';

export const getUsers = async (request: NextRequest) => {
	const users = await usersService.getUsers();
	return ApiSuccess.getUsers(users).toNextResponse();
};

export const deleteUser = async (
	request: NextRequest,
	ctx: { params: { uid: string } },
) => {
	const { uid } = ctx.params;

	try {
		await usersService.deleteUser(uid);
		return ApiSuccess.deleteUser().toNoContentResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};
