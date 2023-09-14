import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Config } from '../../config';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, res } = context;

	const result = await fetch(`${Config.API_URL}/auth/session`, {
		headers: { cookie: req.headers.cookie ?? '' },
	});

	if (!result.ok) {
		return { props: {} };
	}

	const json = await result.json();
	const session = json.payload;

	return { props: { session } };
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
