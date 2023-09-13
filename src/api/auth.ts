import { authService } from '~/services';
import { ApiError, ApiSuccess } from './responses';

export const signUp = async (request: Request) => {
	const data = await request.json();

	try {
		const insertedId = await authService.signUp(data);
		return ApiSuccess.signUp(insertedId).toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};
