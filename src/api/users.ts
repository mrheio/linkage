import { NextRequest } from 'next/server';
import { usersService } from '~/services';
import { ApiError, ApiSuccess } from './responses';

export const getUsers = async (request: NextRequest) => {
	const users = await usersService.getUsers();
	return ApiSuccess.getUsers(users).toNextResponse();
};

export const patchUser = async (
	request: NextRequest,
	context: { params: { uid: string } },
) => {
	const { uid } = context.params;
	const data = await request.json();

	try {
		await usersService.updateUser(uid, data);
		return ApiSuccess.updateUser().toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
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
