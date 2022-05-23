import type { NextApiRequest, NextApiResponse } from 'next';
import { saveData } from '../../libs/generate';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	saveData((err: any) => {
		res.status(200).json({ ok: err ? false : true });
	});
}
