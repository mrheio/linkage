import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Link } from '@nextui-org/react';
import { useRouter } from 'next/router';
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
	const { mutate: signIn, isLoading: isSignInRunning, error } = useSignIn();

	const handleSignIn = handleSubmit((data, e) => {
		signIn(data);
	});

	return (
		<div className="flex h-full flex-col justify-center">
			<form onSubmit={handleSignIn} className="w-full [&>*+*]:mt-8">
				<h1 className="text-4xl font-bold">
					Sign in to your Linkage account
				</h1>
				<Input
					id="username"
					label="Username"
					labelPlacement="outside"
					placeholder="beautifulusername"
					isInvalid={!!errors.username}
					errorMessage={errors.username?.message}
					size="lg"
					{...register('username')}
				/>
				<Input
					id="password"
					type="password"
					label="Password"
					labelPlacement="outside"
					placeholder="supersecretpassword"
					isInvalid={!!errors.password}
					errorMessage={errors.password?.message}
					size="lg"
					{...register('password')}
				/>
				<p className="font-semibold text-danger-400">
					{(error as any)?.message}
				</p>
				<Button
					color="primary"
					type="submit"
					fullWidth
					isLoading={isSignInRunning}
					size="lg"
				>
					Enter Account
				</Button>

				<Button
					fullWidth
					as={Link}
					href={ROUTES.SIGN_UP}
					variant="ghost"
				>
					Don&apos;t have an account? Create one here
				</Button>
			</form>
		</div>
	);
};

export default SignIn;
