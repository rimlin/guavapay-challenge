import type { NextPage } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { stringify } from 'query-string';

import { BreadcrumbItem, Breadcrumbs } from '../../../components/Breadcrumbs';
import { Layout } from '../../../components/Layout';
import { Transaction } from '../../../types/Transaction';
import { Loading } from '../../../components/Loading';
import { Card } from '../../../types/Card';
import { CardInfo } from '../../../components/CardInfo';
import { useQueryParams } from '../../../hooks/useQueryParams';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const CardPage: NextPage = () => {
	const router = useRouter();
	const id = router.query?.id;
	const cardId = router.query?.cardId;
	const [queryParams] = useQueryParams({});

	const { data, error } = useSWR<Card>(`/api/cards/${cardId}`, fetcher);

	return (
		<Layout>
			<Breadcrumbs>
				<BreadcrumbItem href="/">Home</BreadcrumbItem>
				<BreadcrumbItem
					href={{
						pathname: `/transactions`,
						search: stringify(queryParams)
					}}>
					Transactions
				</BreadcrumbItem>
				<BreadcrumbItem
					href={{
						pathname: `/transactions/${id}`,
						search: stringify(queryParams)
					}}>
					{id}
				</BreadcrumbItem>
				<BreadcrumbItem
					href={{
						pathname: `/transactions/${id}/${cardId}`,
						search: stringify(queryParams)
					}}>
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
