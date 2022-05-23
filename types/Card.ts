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
