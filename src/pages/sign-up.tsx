import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSignUp } from '~/hooks';
import { ROUTES } from '~/router';
import { signUpSchema } from '~/schemas';

const SignUp = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { email: '', username: '', password: '' },
		resolver: zodResolver(signUpSchema),
	});
	const {
		mutate: signUp,
		isLoading: isSignUpRunning,
		isSuccess: isSignUpSuccess,
		error,
	} = useSignUp();

	const handleSignUp = handleSubmit((data) => {
		signUp(data);
	});

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
					aria-invalid={errors.email ? 'true' : undefined}
					{...register('email')}
				/>
				<small>{errors.email?.message}</small>
			</div>
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
				<small>{errors.username?.message}</small>
			</div>
			<button type="submit" aria-busy={isSignUpRunning}>
				Create account
			</button>
			<div>
				<small>{(error as any)?.message}</small>
			</div>
			<Link href={ROUTES.SIGN_IN}>
				Already have an account? Enter your account here
			</Link>
		</form>
	);
};

export default SignUp;
