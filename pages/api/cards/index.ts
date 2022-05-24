import type { NextApiRequest, NextApiResponse } from 'next';
import { data } from '../../../libs/data';
import { filterData } from '../../../libs/filterData';
import { ApiListResponse } from '../../../types/Api';
import { Card, CardPageParams } from '../../../types/Card';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiListResponse<Card>>
) {
	const query: CardPageParams = req.query as unknown as CardPageParams;

	const page = +query.page || 0;
	const size_of_page = +query.size_of_page || 10;

	const filter: Partial<Record<keyof Card, any>> = {
		cardID: query.card_id,
		cardAccount: query.card_account,
		currency: query.currency,
		status: query.status
	};

	const filtered = filterData(filter, data.cards);

	res.status(200).json({
		data: filtered.slice(page * size_of_page, (page + 1) * size_of_page),
		total: filtered.length
	});
}
