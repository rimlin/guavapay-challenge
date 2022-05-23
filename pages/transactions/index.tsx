import type { NextPage } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { BreadcrumbItem, Breadcrumbs } from '../../components/Breadcrumbs';
import { Layout } from '../../components/Layout';
import { Pagination } from '../../components/Pagination';
import { Tab, TabPanel, Tabs } from '../../components/Tabs';
import { TransactionItem } from '../../components/TransactionItem';
import { ApiListResponse } from '../../types/Api';
import { Transaction } from '../../types/Transaction';
import styles from '../../styles/Home.module.css';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Transactions: NextPage = () => {
	const router = useRouter();

	const page = router.query?.page ? +router.query?.page : 1;
	const sizeOfPage = router.query?.size_of_page
		? +router.query?.size_of_page
		: 10;

	const { data, error } = useSWR<ApiListResponse<Transaction>>(
		`/api/transactions?page=${page - 1}&size_of_page=${sizeOfPage}`,
		fetcher
	);

	return (
		<Layout>
			<Breadcrumbs>
				<BreadcrumbItem href="/">Home</BreadcrumbItem>
				<BreadcrumbItem href="/transactions">
					Transactions
				</BreadcrumbItem>
			</Breadcrumbs>

			<Tabs className={styles.tabs}>
				<Tab active href="/transactions" id="tab-1" controls="panel-1">
					Transactions
				</Tab>
				<Tab href="/cards" id="tab-2" controls="panel-2">
					Cards
				</Tab>
			</Tabs>

			<TabPanel id="panel-1" labelledby="tab-1">
				{data && (
					<>
						{data.data.map(transaction => (
							<TransactionItem
								key={transaction.transactionID}
								data={transaction}
							/>
						))}
						<Pagination
							className={styles.pagination}
							page={page}
							sizeOfPage={sizeOfPage}
							total={data.total}
						/>
					</>
				)}
			</TabPanel>
		</Layout>
	);
};

export default Transactions;
