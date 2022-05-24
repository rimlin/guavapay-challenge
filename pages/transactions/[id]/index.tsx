import type { NextPage } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { stringify } from 'query-string';

import { BreadcrumbItem, Breadcrumbs } from '../../../components/Breadcrumbs';
import { Layout } from '../../../components/Layout';
import { Transaction } from '../../../types/Transaction';
import { Loading } from '../../../components/Loading';
import { TransactionInfo } from '../../../components/TransactionInfo';
import { useQueryParams } from '../../../hooks/useQueryParams';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Transaction: NextPage = () => {
	const router = useRouter();
	const id = router.query?.id;
	const [queryParams] = useQueryParams({});

	const { data, error } = useSWR<Transaction>(
		`/api/transactions/${id}`,
		fetcher
	);

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
			</Breadcrumbs>

			{!data && <Loading />}

			<div style={{ marginTop: '3rem' }}>
				{data && (
					<>
						<TransactionInfo data={data} />
					</>
				)}
			</div>
		</Layout>
	);
};

export default Transaction;
