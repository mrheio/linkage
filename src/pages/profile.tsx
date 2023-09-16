import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useSignOut, useUpdateUser } from '~/hooks';
import { authService, usersService } from '~/services';
import { CookieKey } from '~/utils';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const accessToken = req.cookies[CookieKey.AccessToken];

	if (!accessToken) {
		return { props: {} };
	}

	const session = await authService.getSession(accessToken);
	const user = await usersService.getUser(session.id);

	return { props: { user: JSON.parse(JSON.stringify(user)) } };
};

const Profile = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
	const { user } = props;
	const { mutate: signOut } = useSignOut();
	const { mutate: updateUser, isLoading: isUpdateUserRunning } =
		useUpdateUser(() => signOut());

	const handleDeleteAccount = async () => {
		updateUser({
			uid: user.id,
			data: { deleted_at: new Date(Date.now()) },
		});
	};

	const handleCancelDeleteAccount = async () => {
		updateUser({ uid: user.id, data: { deleted_at: null } });
	};

	return (
		<div>
			<section>
				<h3>
					{user.username} - {user.email}
				</h3>
				<p>{user.id}</p>
				<p>
					Role: <strong>{user.role}</strong>
				</p>
			</section>
			<section>
				<p>
					Member since:{' '}
					<strong>
						{new Date(user.created_at).toLocaleString()}
					</strong>
				</p>
				<p>
					Last updated:{' '}
					<strong>
						{new Date(user.updated_at).toLocaleString()}
					</strong>
				</p>
				<p>
					Deleted at:{' '}
					<strong>
						{user.deleted_at
							? new Date(user.deleted_at).toLocaleString()
							: 'not yet'}
					</strong>
				</p>
			</section>

			<button
				className="contrast outline"
				type="button"
				onClick={handleDeleteAccount}
				aria-busy={isUpdateUserRunning}
				disabled={user.deleted_at}
			>
				Delete account
			</button>
			<button
				className="contrast outline"
				type="button"
				onClick={handleCancelDeleteAccount}
				aria-busy={isUpdateUserRunning}
				disabled={!user.deleted_at}
			>
				Cancel delete
			</button>
		</div>
	);
};

export default Profile;
