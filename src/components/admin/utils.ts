const createCol = (key: string, label: string) => ({ key, label });

export const mandatoryColumns = [
	createCol('id', 'ID'),
	createCol('name', 'Name'),
];

export const optionalColumns = [
	createCol('slug', 'Slug'),
	createCol('created_at', 'Created At'),
];

export const actionsColumn = createCol('actions', '');
