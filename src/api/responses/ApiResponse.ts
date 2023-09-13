import { NextResponse } from 'next/server';

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
		const { status, ...json } = this;
		return NextResponse.json(json, { status });
	}
}
