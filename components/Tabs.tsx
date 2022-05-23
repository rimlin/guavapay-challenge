import Link, { LinkProps } from 'next/link';
import classNames from 'classnames';

import styles from '../styles/Tabs.module.css';

interface TabsProps {
	className?: string;
	children: React.ReactNode;
}

export const Tabs = ({ className, children }: TabsProps) => {
	return (
		<div
			className={classNames(styles.tabs, className)}
			role="tablist"
			aria-label="Navigation tabs">
			{children}
		</div>
	);
};

interface TabProps extends LinkProps {
	active?: boolean;
	controls: string;
	id: string;
	children: string;
}

export const Tab = ({ active, href, controls, id, children }: TabProps) => {
	return (
		<Link href={href}>
			<a
				className={classNames(styles.tab, {
					[styles.tab__active]: active
				})}
				role="tab"
				aria-selected="true"
				aria-controls={controls}
				id={id}
				tabIndex={0}>
				{children}
			</a>
		</Link>
	);
};

interface TabPanelProps {
	className?: string;
	id: string;
	labelledby: string;
	children: React.ReactNode;
}

export const TabPanel = ({
	className,
	id,
	labelledby,
	children
}: TabPanelProps) => {
	return (
		<div
			className={styles.tabPanel}
			id={id}
			role="tabpanel"
			tabIndex={0}
			aria-labelledby={labelledby}>
			{children}
		</div>
	);
};
