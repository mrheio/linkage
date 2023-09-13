import { NextResponse } from 'next/server';

export default abstract class ApiResponse {
	name: string;
	status: number;
	message: string;

	constructor(message: string, status: number) {
		this.name = this.constructor.name;
		this.status = status;
		this.message = message;
	}

	toNextResponse() {
		const { status, ...json } = this;
		return NextResponse.json(json, { status });
	}
}
