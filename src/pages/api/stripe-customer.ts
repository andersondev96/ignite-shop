import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { userName } = req.body;

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed.' })	
	}

	try {
		const findCustomer = await stripe.customers.search({
			query: `name: '${userName}'`,
		})

		return res.status(200).json({
			customer: findCustomer,
		});

	} catch (err) {
		return res.status(500).json({ error: 'Erro ao buscar cliente no stripe' });
	}	
}