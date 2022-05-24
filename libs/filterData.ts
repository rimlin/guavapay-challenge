export const filterData = <T extends unknown>(
	filter: Partial<Record<keyof T, any>>,
	data: T[]
) => {
	return data.filter(item => {
		let key: keyof T;
		for (key in filter) {
			if (filter[key] !== undefined) {
				if (typeof filter[key] === 'function') {
					if (filter[key](item) !== true) {
						return false;
					}
				} else if (
					(item[key] as any).toString().search(filter[key]) === -1
				) {
					return false;
				}
			}
		}

		return true;
	});
};
