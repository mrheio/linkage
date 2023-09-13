import { SignJWT, decodeJwt as joseDecodeJwt, jwtVerify } from 'jose';

const signJwt = async (
	payload: any,
	options: { expirationTime: string; secret: string },
) => {
	const key = new TextEncoder().encode(options.secret);
	const alg = 'HS256';
	const expirationTime = options.expirationTime;

	const jwt = await new SignJWT(payload)
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime(expirationTime)
		.sign(key);

	return jwt;
};

const decodeJwt = (jwt: string) => {
	const decoded = joseDecodeJwt(jwt);
	return decoded;
};

const verifyJwt = async (jwt: string, secret: string) => {
	const key = new TextEncoder().encode(secret);
	const decoded = await jwtVerify(jwt, key);
	return decoded;
};

export const jwtService = {
	signJwt,
	verifyJwt,
	decodeJwt,
};
