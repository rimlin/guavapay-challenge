import { nanoid } from 'nanoid';
import { DateTime } from 'luxon';
import { Transaction } from '../types/Transaction';
import { Currency } from '../types/Currency';
import { Card } from '../types/Card';
import { cardsData } from './cardsData';

const getRand = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const currency: Currency[] = ['AZN', 'EUR', 'USD'];
const merchants = ['Amazon', 'Book24', 'TV SHOP', 'AliExpress'];

const generateTransactions = (len: number, cards: Card[]): Transaction[] => {
	const cardsMax = cards.length - 1;
	const getItem = (index: number): Transaction => {
		const card = cards[getRand(0, cardsMax)];

		return {
			transactionID: nanoid(),
			cardAccount: card.cardAccount,
			cardID: card.cardID,
			amount: getRand(100, 1000),
			currency: card.currency,
			transactionDate: DateTime.now().minus({ day: index }).toISO(),
			merchantInfo: merchants[getRand(0, merchants.length - 1)]
		};
	};

	const res = [];

	for (let i = 0; i < len; i++) {
		res.push(getItem(i));
	}

	return res;
};

const generateCards = (len: number): Card[] => {
	const getItem = (index: number): Card => {
		const card = cardsData[index];

		return {
			cardID: nanoid(),
			cardAccount: getRand(100000, 10000000),
			maskedCardNumber: `**** **** **** ${card.cardNumber.slice(-4)}`,
			expireDate: card.expires,
			currency: currency[getRand(0, currency.length - 1)],
			status: Math.random() > 0.5 ? 'active' : 'blocked',
			balance: getRand(1000, 100000)
		};
	};

	const res = [];

	for (let i = 0; i < len; i++) {
		res.push(getItem(i));
	}

	return res;
};

const generateData = () => {
	const cards = generateCards(15);

	const transactions = generateTransactions(40, cards);

	return {
		cards,
		transactions
	};
};

export const data = generateData();
