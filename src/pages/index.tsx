import { Button, Card, CardBody } from '@nextui-org/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useOverlays } from '~/providers';
import { authService, postsService } from '~/services';
import { Post, Session } from '~/types';
import { CookieKey } from '~/utils';
import PostCard from './_post-card';

type HomeProps = {
	posts: Post[];
	session: Session | null;
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
	ctx,
) => {
	const posts = await postsService.getPosts();

	const token = ctx.req.cookies[CookieKey.AccessToken];

	if (!token) {
		return {
			props: { posts, session: null },
		};
	}

	const session = await authService.getSession(token);

	return { props: { posts, session } };
};

const Home = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
	const { session, posts } = props;
	const { communityModal } = useOverlays();

	return (
		<>
			<div className="flex gap-6">
				<div className="xl:basis-2/3">
					<div className="flex flex-col gap-8">
						{posts.map((post) => (
							<PostCard key={post.id} post={post} />
						))}
					</div>
				</div>

				<div className="hidden xl:block xl:[&>*+*]:mt-4">
					{session && (
						<>
							<Button fullWidth size="lg" color="primary">
								Create Post
							</Button>
							<Button
								fullWidth
								size="lg"
								color="secondary"
								variant="flat"
								onClick={communityModal.open}
							>
								Create Community
							</Button>
						</>
					)}

					{!session && (
						<Card>
							<CardBody>Sign In to reveal more</CardBody>
						</Card>
					)}
				</div>
			</div>
		</>
	);
};

export default Home;
