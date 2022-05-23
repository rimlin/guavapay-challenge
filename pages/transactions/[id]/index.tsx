import type { NextPage } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { BreadcrumbItem, Breadcrumbs } from '../../../components/Breadcrumbs';
import { Layout } from '../../../components/Layout';
import { Transaction } from '../../../types/Transaction';
import { Loading } from '../../../components/Loading';
import { TransactionInfo } from '../../../components/TransactionInfo';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Transaction: NextPage = () => {
	const router = useRouter();
	const id = router.query?.id;

	const { data, error } = useSWR<Transaction>(
		`/api/transactions/${id}`,
		fetcher
	);

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
