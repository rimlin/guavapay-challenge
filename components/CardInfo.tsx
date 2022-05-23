import { useRouter } from 'next/router';

import styles from '../styles/Card.module.css';
import Link from 'next/link';
import { Card } from '../types/Card';

interface CardInfoProps {
	data: Card;
}

export const CardInfo = ({ data }: CardInfoProps) => {
	const router = useRouter();

	return (
		<article className={styles.cardItem}>
			<h2>{data.maskedCardNumber}</h2>

			<dl>
				<dt>Expire Date</dt>
				<dd>
					<time dateTime={data.expireDate}>{data.expireDate}</time>
				</dd>

				<dt>Balance</dt>
				<dd>
					{data.balance.toLocaleString(undefined, {
						style: 'currency',
						currency: data.currency
					})}
				</dd>

				<dt>Card Account</dt>
				<dd>{data.cardAccount}</dd>

				<dt>Currency</dt>
				<dd>{data.currency}</dd>

				<dt>Status</dt>
				<dd>{data.status}</dd>
			</dl>
		</article>
	);
};
