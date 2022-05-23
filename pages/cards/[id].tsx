import type { NextPage } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { BreadcrumbItem, Breadcrumbs } from '../../components/Breadcrumbs';
import { Layout } from '../../components/Layout';
import { Transaction } from '../../types/Transaction';
import { Loading } from '../../components/Loading';
import styles from '../../styles/Home.module.css';
import { TransactionInfo } from '../../components/TransactionInfo';
import { Card } from '../../types/Card';
import { CardInfo } from '../../components/CardInfo';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Card: NextPage = () => {
	const router = useRouter();
	const id = router.query?.id;

	const { data, error } = useSWR<Card>(`/api/cards/${id}`, fetcher);

	return (
		<Layout>
			<Breadcrumbs>
				<BreadcrumbItem href="/">Home</BreadcrumbItem>
				<BreadcrumbItem href="/transactions">Cards</BreadcrumbItem>
				<BreadcrumbItem href={`/cards/${id}`}>{id}</BreadcrumbItem>
			</Breadcrumbs>

			{!data && <Loading />}

			<div style={{ marginTop: '3rem' }}>
				{data && (
					<>
						<CardInfo data={data} />
					</>
				)}
			</div>
		</Layout>
	);
};

export default Card;
