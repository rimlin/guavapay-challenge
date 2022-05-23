import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from '../styles/Pagination.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Page = number | typeof pageSkip;

const pageSkip = Symbol('pageSkip');
const headCount = 1;
const tailCount = 1;

const getPageWithNeighbours = (
	targetPage: number,
	lastPage: number,
	pages: Page[]
): Page[] => {
	const result: Page[] = [];
	const potential = [targetPage - 1, targetPage, targetPage + 1];

	potential.forEach(page => {
		if (page > 0 && lastPage - page > 0 && !pages.includes(page)) {
			result.push(page);
		}
	});

	return result;
};

const getPartialPages = (
	left: number,
	right: number,
	pages: Page[]
): Page[] => {
	const res = [];
	for (let i = left; i <= right; i++) {
		if (pages.includes(i)) {
			continue;
		}

		res.push(i);
	}

	return res;
};

interface PaginationProps {
	className?: string;
	total: number;
	page: number;
	sizeOfPage: number;
}

export const Pagination = ({
	className,
	total,
	page,
	sizeOfPage
}: PaginationProps) => {
	const [pages, setPages] = useState<Page[]>([]);

	useEffect(() => {
		const lastPage = Math.ceil(total / sizeOfPage);

		const headMax = Math.min(headCount, Math.max(page - 1, lastPage));

		let result: Page[] = [];

		if (page <= headCount) {
			result = getPartialPages(1, headMax, result);
		}

		result.push(...getPageWithNeighbours(page, lastPage, result));

		const headPages = getPartialPages(1, headMax, result);
		if (
			!result.includes(headMax) &&
			!result.includes(headMax + 1) &&
			headPages.includes(headMax)
		) {
			headPages.push(pageSkip);
		}

		result.unshift(...headPages);

		const preLastPage = Math.max(lastPage - tailCount + 1, 1);
		const tailPages = getPartialPages(preLastPage, lastPage, result);
		if (
			!result.includes(preLastPage) &&
			!result.includes(preLastPage - 1) &&
			tailPages.includes(preLastPage)
		) {
			tailPages.unshift(pageSkip);
		}

		result.push(...tailPages);

		setPages(result);
	}, [page, total, sizeOfPage]);

	if (pages.length <= 1) {
		return null;
	}

	return (
		<nav className={className}>
			<ul className={styles.pagination}>
				{pages.map((currPage, index) => {
					if (currPage === pageSkip) {
						return (
							<li key={index}>
								<div className={styles.item}>...</div>
							</li>
						);
					} else {
						return (
							<li
								className={classNames({
									[styles.active]: page === currPage
								})}
								key={index}>
								<Link
									href={{
										query: {
											page: currPage,
											size_of_page: sizeOfPage
										}
									}}>
									<a className={styles.item}>
										{currPage.toString()}
									</a>
								</Link>
							</li>
						);
					}
				})}
			</ul>
		</nav>
	);
};
