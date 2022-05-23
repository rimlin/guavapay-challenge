import type { NextPage } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { BreadcrumbItem, Breadcrumbs } from '../../../components/Breadcrumbs';
import { Layout } from '../../../components/Layout';
import { Transaction } from '../../../types/Transaction';
import { Loading } from '../../../components/Loading';
import { Card } from '../../../types/Card';
import { CardInfo } from '../../../components/CardInfo';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const CardPage: NextPage = () => {
	const router = useRouter();
	const id = router.query?.id;
	const cardId = router.query?.cardId;

	const { data, error } = useSWR<Card>(`/api/cards/${cardId}`, fetcher);

	return (
		<Layout>
			<Breadcrumbs>
				<BreadcrumbItem href="/">Home</BreadcrumbItem>
				<BreadcrumbItem href="/transactions">
					Transactions
				</BreadcrumbItem>
				<BreadcrumbItem href={`/transactions/${id}`}>
					{id}
				</BreadcrumbItem>
				<BreadcrumbItem href={`/transactions/${id}/${cardId}`}>
					{cardId}
				</BreadcrumbItem>
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

export default CardPage;
