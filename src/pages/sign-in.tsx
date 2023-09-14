import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSignIn } from '~/hooks';
import { ROUTES } from '~/router';
import { signInSchema } from '~/schemas';

const SignIn = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { username: '', password: '' },
		resolver: zodResolver(signInSchema),
	});
	const {
		mutate: signIn,
		isLoading: isSignInRunning,
		isSuccess: isSignInSuccess,
		error,
	} = useSignIn();

	const handleSignIn = handleSubmit((data) => {
		signIn(data);
	});

	useEffect(() => {
		if (isSignInSuccess) {
			router.reload();
		}
	}, [isSignInSuccess]);

	return (
		<form onSubmit={handleSignIn}>
			<h1>Sign in to your Linkage account</h1>
			<div>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					aria-invalid={errors.username ? 'true' : undefined}
					{...register('username')}
				/>
				<small>{errors.username?.message}</small>
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					aria-invalid={errors.password ? 'true' : undefined}
					{...register('password')}
				/>
				<small>{errors.password?.message}</small>
			</div>
			<button type="submit" aria-busy={isSignInRunning}>
				Enter account
			</button>
			<div>
				<small>{(error as any)?.message}</small>
			</div>
			<Link href={ROUTES.SIGN_UP}>
				Don&apos;t have an account? Create one here
			</Link>
		</form>
	);
};

export default SignIn;
