import React, { useCallback, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import { useFormik } from 'formik';
import { stringify } from 'query-string';
import { useRouter } from 'next/router';

import { BreadcrumbItem, Breadcrumbs } from '../../components/Breadcrumbs';
import { Layout } from '../../components/Layout';
import { Pagination } from '../../components/Pagination';
import { Tab, TabPanel, Tabs } from '../../components/Tabs';
import { TransactionItem } from '../../components/TransactionItem';
import { ApiListResponse } from '../../types/Api';
import { Transaction, TransactionPageParams } from '../../types/Transaction';
import { useQueryParams } from '../../hooks/useQueryParams';
import styles from '../../styles/Home.module.css';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Transactions: NextPage = () => {
	const router = useRouter();
	const [queryParams, updateQueryParams] =
		useQueryParams<TransactionPageParams>({
			page: '1',
			size_of_page: '10'
		});

	const { data } = useSWR<ApiListResponse<Transaction>>(
		`/api/transactions?${stringify(
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
		useFormik<TransactionPageParams>({
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
				amount: '',
				currency: '',
				date: '',
				...queryParams
			});
		}
	}, [queryParams, router.isReady, setValues]);

	const onChange = useCallback(
		(name: keyof TransactionPageParams) => (event: any) => {
			setFieldValue(name, event.target.value);
		},
		[setFieldValue]
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
						<label htmlFor="amount">amount</label>
						<input
							id="amount"
							type="number"
							value={values.amount}
							onChange={onChange('amount')}
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
						<label htmlFor="date">date</label>
						<input
							id="date"
							type="date"
							value={values.date}
							onChange={onChange('date')}
						/>
					</div>
					<div className={styles.field}>
						<button type="submit">Search</button>
					</div>
				</form>
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

export default Transactions;
