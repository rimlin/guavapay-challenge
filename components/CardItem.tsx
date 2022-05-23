import { useRouter } from 'next/router';

import styles from '../styles/Card.module.css';
import Link from 'next/link';
import { Card } from '../types/Card';

interface CardItemProps {
	data: Card;
}

export const CardItem = ({ data }: CardItemProps) => {
	const router = useRouter();

	return (
		<article className={styles.cardItem}>
			<Link href={`${router.asPath}/${data.cardID}`}>
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
