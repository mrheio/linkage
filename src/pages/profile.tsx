import { Button } from '@nextui-org/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useDeleteAccount } from '~/hooks';
import { authService, usersService } from '~/services';
import { SafeUser } from '~/types';
import { CookieKey } from '~/utils';

type ProfileProps = {
	profile: SafeUser;
};

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
	ctx,
) => {
	const token = ctx.req.cookies[CookieKey.AccessToken] as string;
	const session = await authService.getSession(token);
	const profile = await usersService.getUser(session.id);
	return { props: { profile } };
};

const Profile = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
	const { profile } = props;
	const { mutate: deleteAccount, isLoading: isDeleteAccountRunning } =
		useDeleteAccount();

	const handleDeleteAccount = () => {
		deleteAccount();
	};

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="flex flex-col gap-2">
				<div className="flex items-center">
					<Button isIconOnly radius="full" size="lg">
						{profile.username[0]}
					</Button>
					<h2 className="ml-4 text-3xl">{profile.username}</h2>
				</div>
				<div className="ml-[64px] flex flex-col gap-2 text-lg">
					<p className="text-xl">{profile.email}</p>
					<p>Role: {profile.role}</p>
					<p>Account created on: {profile.created_at}</p>
					<p>
						Is deleted:{' '}
						<span className="text-danger-400">
							{JSON.stringify(!!profile.deleted_at)}
						</span>
					</p>
					<Button
						onClick={handleDeleteAccount}
						isLoading={isDeleteAccountRunning}
						color="danger"
						variant="ghost"
						className="mt-4"
					>
						Delete Account
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
