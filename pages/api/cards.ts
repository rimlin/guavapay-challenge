import type { NextApiRequest, NextApiResponse } from 'next';
import { Transaction } from '../../types/Transaction';
import { data } from '../../libs/data';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Transaction[]>
) {
	res.status(200).json(data.transactions);
}
