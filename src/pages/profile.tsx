import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { jwtService } from '~/services/jwt.service';
import { CookieKey } from '~/utils';
import { Config } from '../../config';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const accessToken = req.cookies[CookieKey.AccessToken];

	if (!accessToken) {
		return { props: {} };
	}

	const jwt = await jwtService.verifyJwt(accessToken, Config.JWT_SECRET);
	return { props: { session: jwt.payload } };
};

const Profile = ({
	session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<div>
			<h1>Profile page</h1>
			<p>{JSON.stringify(session)}</p>
		</div>
	);
};

export default Profile;
