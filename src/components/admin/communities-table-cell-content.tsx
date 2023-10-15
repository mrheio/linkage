import { Button, Tooltip } from '@nextui-org/react';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { useDeleteCommunity } from '~/hooks';
import { useOverlays } from '~/providers';
import { Community } from '~/types';

type CommunityTableCellContentProps = {
	community: Community;
	columnKey: string | number;
};

const CommunitiesTableCellContent = (props: CommunityTableCellContentProps) => {
	const { community, columnKey } = props;
	const { communityDetailsModal } = useOverlays();
	const { mutate: deleteCommunity, isLoading: isDeleteCommunityRunning } =
		useDeleteCommunity();

	if (columnKey === 'actions') {
		return (
			<div className="relative flex items-center justify-end gap-2">
				<Tooltip content="Details">
					<Button
						onClick={() =>
							communityDetailsModal.open(
								JSON.parse(JSON.stringify(community)),
							)
						}
						isIconOnly
						variant="light"
					>
						<IconEye />
					</Button>
				</Tooltip>
				<Tooltip content="Edit">
					<Button isIconOnly variant="light">
						<IconEdit />
					</Button>
				</Tooltip>
				<Tooltip color="danger" content="Delete">
					<Button
						onClick={() => deleteCommunity({ cid: community.id })}
						isLoading={isDeleteCommunityRunning}
						color="danger"
						isIconOnly
						variant="light"
					>
						<IconTrash />
					</Button>
				</Tooltip>
			</div>
		);
	}

	return community[columnKey as keyof Community];
};

export default CommunitiesTableCellContent;
