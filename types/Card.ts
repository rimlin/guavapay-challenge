import { Currency } from './Currency';

export interface Card {
	cardID: string;
	cardAccount: number;
	maskedCardNumber: string;
	expireDate: string;
	currency: Currency;
	status: CardStatus;
	balance: number;
}

export type CardStatus = 'active' | 'blocked';

export interface CardPageParams {
	page: string;
	size_of_page: string;
	card_id?: string;
	card_account?: string;
	currency?: string;
	status?: string;
}
