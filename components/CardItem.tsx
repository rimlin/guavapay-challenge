import { stringify } from 'query-string';
import Link from 'next/link';

import styles from '../styles/Card.module.css';
import { Card } from '../types/Card';
import { useQueryParams } from '../hooks/useQueryParams';

interface CardItemProps {
	data: Card;
}

export const CardItem = ({ data }: CardItemProps) => {
	const [queryParams] = useQueryParams({});

	return (
		<article className={styles.cardItem}>
			<Link
				href={{
					pathname: `/cards/${data.cardID}`,
					search: stringify(queryParams)
				}}>
				<a>
					<div className={styles.cardItem__info}>
						<div className={styles.cardItem__info__details}>
							<h2>{data.maskedCardNumber}</h2>
							<time dateTime={data.expireDate}>
								{data.expireDate}
							</time>
						</div>
						<div className={styles.cardItem__info__amount}>
							{data.balance.toLocaleString(undefined, {
								style: 'currency',
								currency: data.currency
							})}
						</div>
					</div>
				</a>
			</Link>
		</article>
	);
};
