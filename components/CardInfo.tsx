import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from '../styles/Card.module.css';
import { Card } from '../types/Card';
import { stringify } from 'query-string';

interface CardInfoProps {
	data: Card;
}

export const CardInfo = ({ data }: CardInfoProps) => {
	const router = useRouter();

	return (
		<article>
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

				<dt>Transactions</dt>
				<dd>
					<Link
						href={{
							pathname: `/transactions`,
							search: stringify({
								card_id: data.cardID
							})
						}}>
						List
					</Link>
				</dd>
			</dl>
		</article>
	);
};
