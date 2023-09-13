import { NextRequest, NextResponse } from 'next/server';

export const black = '\x1b[30m';
export const red = '\x1b[31m';
export const green = '\x1b[32m';
export const yellow = '\x1b[33m';
export const blue = '\x1b[34m';
export const magenta = '\x1b[35m';
export const cyan = '\x1b[36m';
export const white = '\x1b[37m';

const methodColorMapper = {
	POST: '\x1b[32m',
	GET: '\x1b[36m',
	PATCH: '\x1b[33m',
	DELETE: '\x1b[31m',
};

const log = (request: NextRequest) => {
	const date = new Date(Date.now()).toLocaleString('en-GB');
	let method = request.method;
	method = `${(methodColorMapper as any)[method]}${method}\x1b[0m`;
	const url = request.url;

	console.log(
		`\x1b[37m${date}\x1b[0m - \x1b[1m${method}\x1b[22m - \x1b[1m${url}\x1b[22m`,
	);
};

export const middleware = async (request: NextRequest) => {
	log(request);

	const response = NextResponse.next();
	return response;
};
