import Head from 'next/head';
import React from 'react';

interface Props {
	children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
	return (
		<main>
			<Head>
				<title>Guavapay Challenge</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{children}
		</main>
	);
};
