import { Button, Tooltip } from '@nextui-org/react';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { useDeleteCommunity } from '~/hooks';
import { useOverlays } from '~/providers';
import { Community } from '~/types';
import { msSinceEpochToDate } from '~/utils';

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
						onClick={() => communityDetailsModal.open(community)}
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

	if (columnKey === 'created_at') {
		return msSinceEpochToDate(community[columnKey]);
	}

	return community[columnKey as keyof Community];
};

export default CommunitiesTableCellContent;
