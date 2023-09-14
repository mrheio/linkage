import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	ChangeEventHandler,
	FormEventHandler,
	useEffect,
	useState,
} from 'react';
import { useSignUp } from '~/hooks';
import { ROUTES } from '~/router';

const SignUp = () => {
	const router = useRouter();
	const [fields, setFields] = useState({
		email: '',
		username: '',
		password: '',
	});
	const [errors, setErrors] = useState<{
		email: string[] | null;
		username: string[] | null;
		password: string[] | null;
	}>({ email: null, username: null, password: null });
	const [formError, setFormError] = useState<string | null>(null);
	const {
		mutate: signUp,
		isLoading: isSignUpRunning,
		isSuccess: isSignUpSuccess,
		error: signUpError,
	} = useSignUp();

	const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setFields((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSignUp: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		signUp(fields);
	};

	useEffect(() => {
		const error = signUpError as any;
		setErrors(
			error?.details?.fieldErrors
				? { ...error?.details?.fieldErrors }
				: { email: null, username: null, password: null },
		);
		setFormError(error ? error.message : null);
	}, [signUpError]);

	useEffect(() => {
		if (isSignUpSuccess) {
			router.reload();
		}
	}, [isSignUpSuccess]);

	return (
		<form onSubmit={handleSignUp}>
			<h1>Create your Linkage account</h1>
			<div>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					value={fields.email}
					onChange={handleInputChange}
					aria-invalid={errors.email ? true : undefined}
				/>
				<small>{errors.email?.[0]}</small>
			</div>
			<div>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					name="username"
					value={fields.username}
					onChange={handleInputChange}
					aria-invalid={errors.username ? true : undefined}
				/>
				<small>{errors.username?.[0]}</small>
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					value={fields.password}
					onChange={handleInputChange}
					aria-invalid={errors.password ? true : undefined}
				/>
				<small>{errors.password?.[0]}</small>
			</div>
			<button type="submit" aria-busy={isSignUpRunning}>
				Create account
			</button>
			<div>
				<small>{formError}</small>
			</div>
			<Link href={ROUTES.SIGN_IN}>
				Already have an account? Enter your account here
			</Link>
		</form>
	);
};

export default SignUp;
