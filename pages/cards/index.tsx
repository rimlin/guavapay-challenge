import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Layout } from '../../components/Layout';
import styles from '../../styles/Home.module.css';

const Cards: NextPage = () => {
	return (
		<Layout>
			<Head>
				<title>Guavapay Challenge</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div>
				<Link href="/">Home</Link>
			</div>

			<div className="tabs">
				<div role="tablist" aria-label="Sample Tabs">
					<Link
						href="/transactions"
						role="tab"
						aria-selected="true"
						aria-controls="panel-1"
						id="tab-1"
						tabIndex={0}>
						Transactions
					</Link>
					<Link
						href="/cards"
						role="tab"
						aria-selected="false"
						aria-controls="panel-2"
						id="tab-2"
						tabIndex={-1}>
						Cards
					</Link>
				</div>
				<div
					id="panel-1"
					role="tabpanel"
					tabIndex={0}
					aria-labelledby="tab-1">
					<p>Content for the first panel</p>
				</div>
			</div>
		</Layout>
	);
};

export default Cards;
