import { Button, ButtonGroup, Card, CardBody } from '@nextui-org/react';
import {
	IconArrowBigDownFilled,
	IconArrowBigUp,
	IconBookmark,
	IconMenu,
	IconShare3,
} from '@tabler/icons-react';
import { Post } from '~/drizzle';

const PostCard = ({ post }: { post: Post }) => {
	return (
		<Card>
			<CardBody className="flex flex-row gap-4 px-2 py-4">
				<div className="flex flex-col justify-center gap-2">
					<Button
						variant="light"
						size="sm"
						startContent={<IconArrowBigUp />}
					>
						{post.upvotes}
					</Button>
					<Button
						variant="light"
						size="sm"
						startContent={<IconArrowBigDownFilled />}
					>
						{post.downvotes}
					</Button>
				</div>
				<div className="flex flex-col gap-6">
					<div>
						<h3 className="text-xl font-semibold">{post.title}</h3>
						<p className="mt-4 line-clamp-3">{post.content}</p>
					</div>
					<ButtonGroup size="sm" className="justify-end">
						<Button isIconOnly radius="full" variant="light">
							<IconShare3 size={18} />
						</Button>
						<Button isIconOnly radius="full" variant="light">
							<IconBookmark size={18} />
						</Button>
						<Button isIconOnly radius="full" variant="light">
							<IconMenu size={18} />
						</Button>
					</ButtonGroup>
				</div>
			</CardBody>
		</Card>
	);
};

export default PostCard;
