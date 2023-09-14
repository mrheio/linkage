import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { usersService } from '~/services';
import { jwtService } from '~/services/jwt.service';
import { CookieKey } from '~/utils';
import { Config } from '../../config';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const accessToken = req.cookies[CookieKey.AccessToken];

	if (!accessToken) {
		return { props: {} };
	}

	const { payload } = await jwtService.verifyJwt(
		accessToken,
		Config.JWT_SECRET,
	);

	const user = await usersService.getUser(payload.id);

	return { props: { user: JSON.parse(JSON.stringify(user)) } };
};

const Profile = ({
	user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<div>
			<h1>
				{user.username} - {user.email}
			</h1>
			<p>
				Member since:{' '}
				<strong>{new Date(user.created_at).toLocaleString()}</strong>
			</p>
			<p>
				Last updated:{' '}
				<strong>{new Date(user.updated_at).toLocaleString()}</strong>
			</p>
			<p>
				Deleted at:{' '}
				<strong>
					{user.deleted_at
						? new Date(user.deleted_at).toLocaleString()
						: 'not yet'}
				</strong>
			</p>
			<p>
				Role: <strong>{user.role}</strong>
			</p>
		</div>
	);
};

export default Profile;
