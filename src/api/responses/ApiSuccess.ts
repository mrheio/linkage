import { HTTP_STATUS_CODE } from '../status-codes';
import ApiResponse from './ApiResponse';

export default class ApiSuccess extends ApiResponse {
	payload: unknown;

	constructor(
		message: string,
		init?: { status?: number; payload?: unknown },
	) {
		super(message, init?.status ?? 200);
		this.payload = init?.payload ?? null;
	}

	static signUp(uid: string) {
		return new ApiSuccess('User registered', {
			status: HTTP_STATUS_CODE.CREATED,
			payload: { uid },
		});
	}
}
