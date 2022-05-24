import { Card } from '../types/Card';
import { Transaction } from '../types/Transaction';

export const data: {
	cards: Card[];
	transactions: Transaction[];
} = require('../public/data.json');
