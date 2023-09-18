import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
	useAddUserToCommunity,
	useRemoveUserFromCommunity,
	useUserCommunities,
} from '~/hooks';
import { authService, communitiesService } from '~/services';
import { CookieKey } from '~/utils';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const accessToken = req.cookies[CookieKey.AccessToken];

	if (!accessToken) {
		const communities = await communitiesService.getCommunities();

		return {
			props: { communities: JSON.parse(JSON.stringify(communities)) },
		};
	}

	const session = await authService.getSession(accessToken);
	const userCommunities = await communitiesService.getUserCommunities(
		session.id,
	);
	const userNotInCommunities = await communitiesService.getUserCommunities(
		session.id,
		{ reverse: true },
	);

	return {
		props: {
			session: session,
			userCommunities: JSON.parse(JSON.stringify(userCommunities)),
			userNotInCommunities: JSON.parse(
				JSON.stringify(userNotInCommunities),
			),
		},
	};
};

export default function Home(
	props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
	const { session } = props;

	if (!session) {
		const { communities } = props;

		return (
			<main>
				<section>
					<h1>Become part of great communities. Join Linkage now!</h1>
					{communities?.map((c) => (
						<article key={c.id}>
							<header>
								<h4>{c.name}</h4>
							</header>
							{c.description}
							<footer>
								<small>
									Created at:{' '}
									{new Date(
										c.created_at,
									).toLocaleDateString()}
								</small>
							</footer>
						</article>
					))}
				</section>
			</main>
		);
	}

	const { userCommunities, userNotInCommunities } = props;
	const { data: communities } = useUserCommunities(session.id, {
		initialData: userCommunities,
	});
	const { data: notInCommunities } = useUserCommunities(session.id, {
		initialData: userNotInCommunities,
		reverse: true,
	});
	const { mutate: addUserToCommunity } = useAddUserToCommunity();
	const { mutate: removeUserFromCommunity } = useRemoveUserFromCommunity();

	const handleAddUserToCommunity = (cid) => {
		addUserToCommunity({ uid: session.id, cid });
	};

	const handleRemoveUserFromCommunity = (cid) => {
		removeUserFromCommunity({ uid: session.id, cid });
	};

	return (
		<main>
			<section>
				<h1>Your communities</h1>
				{communities?.map((c) => (
					<article key={c.id}>
						<header>
							<h4>
								{c.id} - {c.name}
							</h4>
						</header>
						{c.description}
						<footer>
							<small>
								Created at:{' '}
								{new Date(c.created_at).toLocaleDateString()}
							</small>
							<button
								type="button"
								className="secondary outline"
								onClick={() =>
									handleRemoveUserFromCommunity(c.id)
								}
							>
								Leave community
							</button>
						</footer>
					</article>
				))}
			</section>

			<section>
				<h1>Not part of these ones yet</h1>
				{notInCommunities?.map((c) => (
					<article key={c.id}>
						<header>
							<h4>
								{c.id} - {c.name}
							</h4>
						</header>
						{c.description}
						<footer>
							<small>
								Created at:{' '}
								{new Date(c.created_at).toLocaleDateString()}
							</small>
							<button
								type="button"
								onClick={() => handleAddUserToCommunity(c.id)}
							>
								Join community
							</button>
						</footer>
					</article>
				))}
			</section>
		</main>
	);
}
