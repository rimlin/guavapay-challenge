import type { NextPage } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { stringify } from 'query-string';

import { BreadcrumbItem, Breadcrumbs } from '../../components/Breadcrumbs';
import { Layout } from '../../components/Layout';
import { Pagination } from '../../components/Pagination';
import { Tab, TabPanel, Tabs } from '../../components/Tabs';
import { ApiListResponse } from '../../types/Api';
import { Card, CardPageParams } from '../../types/Card';
import { CardItem } from '../../components/CardItem';
import { useQueryParams } from '../../hooks/useQueryParams';
import styles from '../../styles/Home.module.css';
import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Cards: NextPage = () => {
	const router = useRouter();
	const [queryParams, updateQueryParams] = useQueryParams<CardPageParams>({
		page: '1',
		size_of_page: '10'
	});

	const { data, error } = useSWR<ApiListResponse<Card>>(
		`/api/cards?${stringify(
			{
				...queryParams,
				page: +queryParams.page - 1
			},
			{
				skipNull: true,
				skipEmptyString: true
			}
		)}`,
		fetcher
	);

	const { setValues, values, setFieldValue, handleSubmit } =
		useFormik<CardPageParams>({
			initialValues: queryParams,
			onSubmit: values => {
				updateQueryParams(values);
			}
		});

	useEffect(() => {
		if (router.isReady) {
			setValues({
				card_id: '',
				card_account: '',
				currency: '',
				status: '',
				...queryParams
			});
		}
	}, [queryParams, router.isReady, setValues]);

	const onChange = useCallback(
		(name: keyof CardPageParams) => (event: any) => {
			setFieldValue(name, event.target.value);
		},
		[setFieldValue]
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
				<form onSubmit={handleSubmit} className={styles.filters}>
					<div className={styles.field}>
						<label htmlFor="cardID">cardID</label>
						<input
							id="cardID"
							type="text"
							value={values.card_id}
							onChange={onChange('card_id')}
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor="cardAccount">cardAccount</label>
						<input
							id="cardAccount"
							type="text"
							value={values.card_account}
							onChange={onChange('card_account')}
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor="currency">currency</label>
						<select
							id="currency"
							value={values.currency}
							onChange={onChange('currency')}>
							<option value=""></option>
							<option value="AZN">AZN</option>
							<option value="EUR">EUR</option>
							<option value="USD">USD</option>
						</select>
					</div>
					<div className={styles.field}>
						<label htmlFor="status">status</label>
						<select
							id="status"
							value={values.status}
							onChange={onChange('status')}>
							<option value=""></option>
							<option value="active">active</option>
							<option value="blocked">blocked</option>
						</select>
					</div>
					<div className={styles.field}>
						<button type="submit">Search</button>
					</div>
				</form>

				{data && (
					<>
						<div className={styles.cards}>
							{data.data.map(card => (
								<CardItem key={card.cardID} data={card} />
							))}
						</div>
						<Pagination
							className={styles.pagination}
							page={+queryParams.page}
							sizeOfPage={+queryParams.size_of_page}
							total={data.total}
						/>
					</>
				)}
			</TabPanel>
		</Layout>
	);
};

export default Cards;
