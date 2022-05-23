import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useBreadcrumbItem, useBreadcrumbs } from '@react-aria/breadcrumbs';
import {
	AriaBreadcrumbItemProps,
	AriaBreadcrumbsProps
} from '@react-types/breadcrumbs';
import classNames from 'classnames';

import styles from '../styles/Breadcrumbs.module.css';

interface BreadcrumbsProps<T> extends AriaBreadcrumbsProps<T> {
	children: React.ReactElement | React.ReactElement[];
}

export const Breadcrumbs = <T extends unknown>(props: BreadcrumbsProps<T>) => {
	let { navProps } = useBreadcrumbs(props);
	let children = React.Children.toArray(props.children);

	return (
		<nav {...navProps}>
			<ol className={styles.breadcrumbs}>
				{children.map((child, i) =>
					React.cloneElement(child as React.ReactElement, {
						isCurrent: i === children.length - 1
					})
				)}
			</ol>
		</nav>
	);
};

interface BreadcrumbItemProps extends LinkProps, AriaBreadcrumbItemProps {
	isCurrent?: boolean;
}

export const BreadcrumbItem = (props: BreadcrumbItemProps) => {
	let ref = React.useRef<null>(null);
	let { itemProps } = useBreadcrumbItem({ ...props, elementType: 'a' }, ref);

	return (
		<li>
			<Link href={props.href}>
				<a
					{...itemProps}
					ref={ref}
					className={classNames(styles.breadcrumb__item, {
						[styles.breadcrumb__item_current]: props.isCurrent
					})}>
					{props.children}
				</a>
			</Link>
			{!props.isCurrent && (
				<span
					aria-hidden="true"
					className={styles.breadcrumb__item__divider}>
					{'›'}
				</span>
			)}
		</li>
	);
};
