import type { NextPage } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { BreadcrumbItem, Breadcrumbs } from '../../components/Breadcrumbs';
import { Layout } from '../../components/Layout';
import { Pagination } from '../../components/Pagination';
import { Tab, TabPanel, Tabs } from '../../components/Tabs';
import { TransactionItem } from '../../components/TransactionItem';
import { ApiListResponse } from '../../types/Api';
import { Card } from '../../types/Card';
import { CardItem } from '../../components/CardItem';
import styles from '../../styles/Home.module.css';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Cards: NextPage = () => {
	const router = useRouter();

	const page = router.query?.page ? +router.query?.page : 1;
	const sizeOfPage = router.query?.size_of_page
		? +router.query?.size_of_page
		: 10;

	const { data, error } = useSWR<ApiListResponse<Card>>(
		`/api/cards?page=${page - 1}&size_of_page=${sizeOfPage}`,
		fetcher
	);

	return (
		<Layout>
			<Breadcrumbs>
				<BreadcrumbItem href="/">Home</BreadcrumbItem>
				<BreadcrumbItem href="/cards">Cards</BreadcrumbItem>
			</Breadcrumbs>

			<Tabs className={styles.tabs}>
				<Tab href="/transactions" id="tab-1" controls="panel-1">
					Transactions
				</Tab>
				<Tab active href="/cards" id="tab-2" controls="panel-2">
					Cards
				</Tab>
			</Tabs>

			<TabPanel id="panel-2" labelledby="tab-2">
				{data && (
					<>
						<div className={styles.cards}>
							{data.data.map(card => (
								<CardItem key={card.cardID} data={card} />
							))}
						</div>
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

export default Cards;
