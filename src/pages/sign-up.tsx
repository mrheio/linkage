import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Link } from '@nextui-org/react';
import { useRouter } from 'next/router';
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
	const { mutate: signUp, isLoading: isSignUpRunning, error } = useSignUp();

	const handleSignUp = handleSubmit((data) => {
		signUp(data);
	});

	return (
		<div className="flex h-full flex-col justify-center">
			<form onSubmit={handleSignUp} className="w-full [&>*+*]:mt-8">
				<h1 className="text-4xl font-bold">
					Create your Linkage account
				</h1>
				<Input
					id="email"
					label="Email"
					labelPlacement="outside"
					placeholder="example@email.com"
					isInvalid={!!errors.email}
					errorMessage={errors.email?.message}
					size="lg"
					{...register('email')}
				/>
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
					fullWidth
					color="primary"
					variant="flat"
					type="submit"
					isLoading={isSignUpRunning}
					size="lg"
				>
					Create Account
				</Button>

				<Button
					as={Link}
					variant="ghost"
					fullWidth
					href={ROUTES.SIGN_IN}
				>
					Already have an account? Sign In
				</Button>
			</form>
		</div>
	);
};

export default SignUp;
