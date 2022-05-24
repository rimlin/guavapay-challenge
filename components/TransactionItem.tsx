import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { stringify } from 'query-string';
import Link from 'next/link';

import { Transaction } from '../types/Transaction';
import styles from '../styles/Transaction.module.css';
import { useQueryParams } from '../hooks/useQueryParams';

interface TransactionItemProps {
	data: Transaction;
}

export const TransactionItem = ({ data }: TransactionItemProps) => {
	const [queryParams] = useQueryParams({});

	return (
		<article className={styles.transactionItem}>
			<Link
				href={{
					pathname: `/transactions/${data.transactionID}`,
					search: stringify(queryParams)
				}}>
				<a>
					<div className={styles.transactionItem__head}>
						<h2>{data.merchantInfo}</h2>
						<time dateTime={data.transactionDate}>
							{DateTime.fromISO(data.transactionDate).toFormat(
								'yyyy LLL dd HH:mm'
							)}
						</time>
					</div>
					<div className={styles.transactionItem__amount}>
						{data.amount.toLocaleString(undefined, {
							style: 'currency',
							currency: data.currency
						})}
					</div>
				</a>
			</Link>
		</article>
	);
};
