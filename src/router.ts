export const ROUTES = {
	HOME: '/',
	SIGN_IN: '/sign-in',
	SIGN_UP: '/sign-up',
	PROFILE: '/profile',
	ADMIN: '/admin',
};

const AUTH_ROUTES = [ROUTES.SIGN_IN, ROUTES.SIGN_UP];
const PROTECTED_ROUTES = [ROUTES.PROFILE, ROUTES.ADMIN];

export const isProtectedRoute = (route: string) =>
	PROTECTED_ROUTES.includes(route);
export const isAuthRoute = (route: string) => AUTH_ROUTES.includes(route);
export const isAdminRoute = (route: string) => route.includes('/admin');
