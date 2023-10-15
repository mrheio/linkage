import { Selection } from '@nextui-org/react';
import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import { useCommunities } from '~/hooks';
import { Community } from '~/types';
import CommunitiesTableFilters from './communities-table-filters';
import CommunitiesTable from './community-table';
import { optionalColumns } from './utils';

type CommunitiesTabProps = {
	initialData: Community[];
};

const rowsPerPage = 12;

const CommunitiesTab = (props: CommunitiesTabProps) => {
	const { data: communities } = useCommunities(props.initialData);
	const [searchValue, setSearchValue] = useState('');
	const [visibleColumns, setVisibleColumns] = useState<
		{ key: string; label: string }[]
	>([]);
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(
		Math.ceil(communities.length / rowsPerPage),
	);

	const handlePageChange = (page: number) => {
		setPage(page);
	};

	const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (page !== 1) {
			setPage(1);
		}

		setSearchValue(e.target.value);
	};

	const handleVisibleColumnsChange = (keys: Selection) => {
		if (keys === 'all') {
			setVisibleColumns(optionalColumns);
			return;
		}

		setVisibleColumns(optionalColumns.filter((x) => keys.has(x.key)));
	};

	const filteredCommunities = useMemo(() => {
		return communities.filter((c) =>
			c.name.toLowerCase().includes(searchValue.toLowerCase()),
		);
	}, [communities, searchValue]);

	useEffect(() => {
		const pagesCount = Math.ceil(filteredCommunities.length / rowsPerPage);
		setPages(pagesCount);
	}, [filteredCommunities]);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredCommunities.slice(start, end);
	}, [page, filteredCommunities]);

	useEffect(() => {
		console.log({ communities });
	}, [communities]);

	useEffect(() => {
		console.log({ filteredCommunities });
	}, [filteredCommunities]);

	useEffect(() => {
		console.log({ items });
	}, [items]);

	return (
		<>
			<CommunitiesTableFilters
				searchValue={searchValue}
				onSearchChange={handleSearchChange}
				visibleColumnsKeys={visibleColumns.map((c) => c.key)}
				onVisibleColumnsKeysChange={handleVisibleColumnsChange}
			/>
			<CommunitiesTable
				communities={items}
				page={page}
				pages={pages}
				onPageChange={handlePageChange}
				additionalColumns={visibleColumns}
			/>
		</>
	);
};

export default CommunitiesTab;
