import type { NextPage } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { stringify } from 'query-string';

import { BreadcrumbItem, Breadcrumbs } from '../../../components/Breadcrumbs';
import { Layout } from '../../../components/Layout';
import { Loading } from '../../../components/Loading';
import { Card } from '../../../types/Card';
import { CardInfo } from '../../../components/CardInfo';
import { useQueryParams } from '../../../hooks/useQueryParams';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Card: NextPage = () => {
	const [queryParams] = useQueryParams({});
	const router = useRouter();
	const id = router.query?.id;

	const { data, error } = useSWR<Card>(`/api/cards/${id}`, fetcher);

	return (
		<Layout>
			<Breadcrumbs>
				<BreadcrumbItem href="/">Home</BreadcrumbItem>
				<BreadcrumbItem
					href={{
						pathname: `/cards`,
						search: stringify(queryParams)
					}}>
					Cards
				</BreadcrumbItem>
				<BreadcrumbItem
					href={{
						pathname: `/cards/${id}`,
						search: stringify(queryParams)
					}}>
					{id}
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

export default Card;
