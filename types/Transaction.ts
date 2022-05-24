import { Currency } from './Currency';

export interface Transaction {
	transactionID: string;
	cardAccount: number;
	cardID: string;
	amount: number;
	currency: Currency;
	transactionDate: string;
	merchantInfo: string;
}

export interface TransactionPageParams {
	page: string;
	size_of_page: string;
	card_id?: string;
	card_account?: string;
	amount?: string;
	currency?: string;
	date?: string;
}
