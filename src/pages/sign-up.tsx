import Link from 'next/link';
import { ROUTES } from '~/router';

const SignUp = () => {
	return (
		<form>
			<h1>Create your Linkage account</h1>
			<div>
				<label htmlFor="email">Email</label>
				<input id="email" name="email" />
			</div>
			<div>
				<label htmlFor="username">Username</label>
				<input id="username" name="username" />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input id="password" name="password" />
			</div>
			<button>Create account</button>
			<Link href={ROUTES.SIGN_IN}>
				Already have an account? Enter your account here
			</Link>
		</form>
	);
};

export default SignUp;
