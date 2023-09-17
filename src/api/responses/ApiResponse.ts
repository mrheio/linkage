import { NextResponse } from 'next/server';
import { HTTP_STATUS_CODE } from '../status-codes';

export default abstract class ApiResponse {
	type: string;
	status: number;
	message: string;

	constructor(type: string, message: string, status: number) {
		this.type = type;
		this.status = status;
		this.message = message;
	}

	toNextResponse() {
		if (this.status === HTTP_STATUS_CODE.NO_CONTENT) {
			throw new Error(
				'Call toNoContentResponse for 204 response status code',
			);
		}
		const { status, ...json } = this;
		return NextResponse.json(json, { status });
	}
}
