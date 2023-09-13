import Link from 'next/link';
import { ROUTES } from '~/router';

const SignIn = () => {
	return (
		<form>
			<h1>Sign in to your Linkage account</h1>
			<div>
				<label htmlFor="username">Username</label>
				<input id="username" name="username" />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input id="password" name="password" />
			</div>
			<button>Enter account</button>
			<Link href={ROUTES.SIGN_UP}>
				Don't have an account? Create one here
			</Link>
		</form>
	);
};

export default SignIn;
