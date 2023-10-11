import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from '@nextui-org/react';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { useOverlays } from '~/providers';
import { Community } from '~/types';

type CommunityTableCellContentProps = {
	community: Community;
	columnKey: keyof Community | 'actions';
};

type CommunitiesTableProps = {
	communities: Community[];
};

const createCol = (key: string, label: string) => ({ key, label });

const columns = [
	createCol('id', 'ID'),
	createCol('name', 'Name'),
	createCol('slug', 'Slug'),
	createCol('created_at', 'Created At'),
	createCol('actions', 'Actions'),
];

const CommunityTableCellContent = (props: CommunityTableCellContentProps) => {
	const { communityDetailsModal } = useOverlays();
	const { community, columnKey } = props;

	return columnKey !== 'actions' ? (
		community[columnKey]
	) : (
		<div className="relative flex items-center gap-2">
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
				<Button color="danger" isIconOnly variant="light">
					<IconTrash />
				</Button>
			</Tooltip>
		</div>
	);
};

const CommunitiesTable = ({ communities }: CommunitiesTableProps) => {
	return (
		<Table>
			<TableHeader columns={columns}>
				{(column) => <TableColumn>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={communities}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => (
							<TableCell>
								<CommunityTableCellContent
									community={item}
									columnKey={
										columnKey as keyof Community | 'actions'
									}
								/>
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default CommunitiesTable;
