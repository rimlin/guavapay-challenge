import type { NextApiRequest, NextApiResponse } from 'next';
import { Transaction, TransactionPageParams } from '../../../types/Transaction';
import { data } from '../../../libs/data';
import { ApiListResponse } from '../../../types/Api';
import { DateTime } from 'luxon';
import { filterData } from '../../../libs/filterData';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiListResponse<Transaction>>
) {
	const query: TransactionPageParams =
		req.query as unknown as TransactionPageParams;

	const page = +query.page || 0;
	const size_of_page = +query.size_of_page || 10;

	const filter: Partial<Record<keyof Transaction, any>> = {
		cardID: query.card_id,
		cardAccount: query.card_account,
		amount: query.amount ? +query.amount : undefined,
		currency: query.currency,
		transactionDate: query.date
			? (item: Transaction) => {
					console.log(
						DateTime.fromISO(item.transactionDate).hasSame(
							DateTime.fromISO(query.date!),
							'day'
						)
					);
					return DateTime.fromISO(item.transactionDate).hasSame(
						DateTime.fromISO(query.date!),
						'day'
					);
			  }
			: undefined
	};

	const filtered = filterData(filter, data.transactions);

	res.status(200).json({
		data: filtered.slice(page * size_of_page, (page + 1) * size_of_page),
		total: filtered.length
	});
}
