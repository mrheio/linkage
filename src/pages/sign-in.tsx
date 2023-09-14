import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	ChangeEventHandler,
	FormEventHandler,
	useEffect,
	useState,
} from 'react';
import { ROUTES } from '~/router';

const SignIn = () => {
	const router = useRouter();
	const [fields, setFields] = useState({ username: '', password: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [errors, setErrors] = useState<{
		username: string[] | null;
		password: string[] | null;
	}>({ username: null, password: null });
	const [formError, setFormError] = useState<string | null>(null);

	const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setFields((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSignIn: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		setIsLoading(true);
		setErrors({ username: null, password: null });
		setFormError(null);

		const response = await fetch(`/api/auth/sign-in`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(fields),
		});

		if (response.ok) {
			setIsSuccess(true);
		} else {
			const error = await response.json();
			if (error.details) {
				const fieldErrors = error.details.fieldErrors;
				setErrors({ ...fieldErrors });
			}
			if (!error.details) {
				setFormError(error.message);
			}
		}

		setIsLoading(false);
	};

	useEffect(() => {
		if (isSuccess) {
			router.reload();
		}
	}, [isSuccess]);

	return (
		<form onSubmit={handleSignIn}>
			<h1>Sign in to your Linkage account</h1>
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
			<button type="submit" aria-busy={isLoading}>
				Enter account
			</button>
			<div>
				<small>{formError}</small>
			</div>
			<Link href={ROUTES.SIGN_UP}>
				Don&apos;t have an account? Create one here
			</Link>
		</form>
	);
};

export default SignIn;
