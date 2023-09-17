import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const CookieKey = {
	AccessToken: 'access_token',
	RefreshToken: 'refresh_token',
};

export const secureCookieOptions: Partial<ResponseCookie> = {
	httpOnly: true,
	secure: true,
	expires: new Date().setDate(new Date().getDate() + 30),
};
