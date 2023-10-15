import {
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';
import { Community } from '~/types';
import CommunitiesTableCellContent from './communities-table-cell-content';
import { actionsColumn, mandatoryColumns } from './utils';

type CommunitiesTableProps = {
	communities: Community[];
	pages: number;
	page: number;
	onPageChange: (page: number) => void;
	additionalColumns: { key: string; label: string }[];
};

const CommunitiesTable = (props: CommunitiesTableProps) => {
	const { communities, pages, page, onPageChange, additionalColumns } = props;

	return (
		<Table
			selectionMode="multiple"
			aria-label="Communities table"
			bottomContent={
				<div className="flex w-full justify-center">
					<Pagination
						variant="light"
						isCompact
						showControls
						showShadow
						page={page}
						total={pages}
						onChange={onPageChange}
					/>
				</div>
			}
		>
			<TableHeader
				columns={[
					...mandatoryColumns,
					...additionalColumns,
					actionsColumn,
				]}
			>
				{(column) => (
					<TableColumn
						className={
							column.key === actionsColumn.key
								? 'text-end'
								: undefined
						}
					>
						{column.label}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={communities}>
				{(community) => (
					<TableRow key={community.id}>
						{(columnKey) => (
							<TableCell>
								<CommunitiesTableCellContent
									community={community}
									columnKey={columnKey}
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
