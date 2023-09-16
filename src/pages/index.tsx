import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { authService, communitiesService } from '~/services';
import { CookieKey } from '~/utils';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const accessToken = req.cookies[CookieKey.AccessToken];

	if (!accessToken) {
		return { props: {} };
	}

	const session = await authService.getSession(accessToken);
	const communities = await communitiesService.getUserCommunities(session.id);

	return { props: { communities: JSON.parse(JSON.stringify(communities)) } };
};

export default function Home(
	props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
	const { communities } = props;
	return (
		<main>
			<h1>This is my Home Page!</h1>
			{communities?.map((c) => (
				<article key={c.id}>
					<h3>{c.name}</h3>
					<p>{c.description}</p>
					<small>
						Created at:{' '}
						{new Date(c.created_at).toLocaleDateString()}
					</small>
				</article>
			))}
		</main>
	);
}
