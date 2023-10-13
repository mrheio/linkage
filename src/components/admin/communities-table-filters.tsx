import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Selection,
} from '@nextui-org/react';
import { IconArrowBigDown, IconRefresh, IconSearch } from '@tabler/icons-react';
import { ChangeEventHandler } from 'react';
import { optionalColumns } from './utils';

type CommunitiesTabFilters = {
	visibleColumnsKeys: string[] | number[];
	onVisibleColumnsKeysChange: (keys: Selection) => void;
	searchValue: string;
	onSearchChange: ChangeEventHandler<HTMLInputElement>;
};

const CommunitiesTableFilters = (props: CommunitiesTabFilters) => {
	const {
		visibleColumnsKeys,
		onVisibleColumnsKeysChange,
		searchValue,
		onSearchChange,
	} = props;

	return (
		<div className="mb-4 flex items-center gap-4">
			<Input
				placeholder="Search..."
				endContent={<IconSearch />}
				value={searchValue}
				onChange={onSearchChange}
			/>
			<Dropdown>
				<DropdownTrigger className="hidden sm:flex">
					<Button endContent={<IconArrowBigDown />} variant="flat">
						Columns
					</Button>
				</DropdownTrigger>
				<DropdownMenu
					aria-label="Communities Table Columns"
					closeOnSelect={false}
					selectionMode="multiple"
					selectedKeys={visibleColumnsKeys}
					onSelectionChange={onVisibleColumnsKeysChange}
				>
					{optionalColumns.map((col) => (
						<DropdownItem key={col.key}>{col.label}</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
			<Button isIconOnly variant="light">
				<IconRefresh />
			</Button>
		</div>
	);
};

export default CommunitiesTableFilters;
