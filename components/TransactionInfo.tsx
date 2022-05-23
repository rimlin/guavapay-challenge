import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Transaction } from '../types/Transaction';
import styles from '../styles/Transaction.module.css';

interface TransactionInfoProps {
	data: Transaction;
}

export const TransactionInfo = ({ data }: TransactionInfoProps) => {
	const router = useRouter();

	return (
		<article className={styles.transactionItem}>
			<div className={styles.transactionItem__head}>
				<h2>{data.merchantInfo}</h2>
			</div>
			<dl>
				<dt>Transaction ID</dt>
				<dd>{data.transactionID}</dd>
				<dt>Amount</dt>
				<dd>
					{' '}
					{data.amount.toLocaleString(undefined, {
						style: 'currency',
						currency: data.currency
					})}
				</dd>
				<dt>Date</dt>
				<dd>
					<time dateTime={data.transactionDate}>
						{DateTime.fromISO(data.transactionDate).toFormat(
							'yyyy LLL dd HH:mm'
						)}
					</time>
				</dd>
				<dt>Card</dt>
				<dd>
					<Link href={`${router.asPath}/${data.cardID}`}>
						{data.cardID}
					</Link>
				</dd>
				<dt>Card Account</dt>
				<dd>{data.cardAccount}</dd>
			</dl>
		</article>
	);
};
