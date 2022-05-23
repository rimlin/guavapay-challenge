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
