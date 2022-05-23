import type { NextApiRequest, NextApiResponse } from 'next';
import { data } from '../../../libs/data';
import { ApiListResponse } from '../../../types/Api';
import { Card } from '../../../types/Card';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiListResponse<Card>>
) {
	const page = +req.query.page || 0;
	const size_of_page = +req.query.size_of_page || 10;

	res.status(200).json({
		data: data.cards.slice(page * size_of_page, (page + 1) * size_of_page),
		total: data.cards.length
	});
}
