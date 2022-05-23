import type { NextApiRequest, NextApiResponse } from 'next';
import { data } from '../../../libs/data';
import { Card } from '../../../types/Card';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Card | undefined>
) {
	const id = req.query.id;

	res.status(200).json(data.cards.find(item => item.cardID === id));
}
