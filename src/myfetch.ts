import { HTTP_STATUS_CODE } from './api/status-codes';

class FetchBuilder {
	input: RequestInfo | URL;
	init?: RequestInit | undefined;

	constructor(input: RequestInfo | URL, init?: RequestInit | undefined) {
		this.input = input;
		this.init = init;
	}

	GET() {
		return new FetchBuilder(this.input, { ...this.init, method: 'GET' });
	}

	POST(body?: unknown) {
		return new FetchBuilder(this.input, {
			...this.init,
			method: 'POST',
			headers: {
				...this.init?.headers,
				'Content-Type': 'application/json',
			},
			body: body ? JSON.stringify(body) : undefined,
		});
	}

	PATCH(body?: unknown) {
		return new FetchBuilder(this.input, {
			...this.init,
			method: 'PATCH',
			headers: {
				...this.init?.headers,
				'Content-Type': 'application/json',
			},
			body: body ? JSON.stringify(body) : undefined,
		});
	}

	DELETE() {
		return new FetchBuilder(this.input, { ...this.init, method: 'DELETE' });
	}

	async run() {
		const response = await fetch(this.input, this.init);

		if (!response.ok) {
			if (response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
				await fetch('/api/auth/refresh', { method: 'POST' });
				return this.run();
			}

			const error = await response.json();
			throw error;
		}

		return response;
	}

	async json() {
		const response = await this.run();
		return response.json();
	}
}

const myfetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => {
	return new FetchBuilder(input, init);
};

export default myfetch;
