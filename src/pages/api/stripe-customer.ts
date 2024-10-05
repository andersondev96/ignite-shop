import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { userName } = req.body;

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed.' })	
	}

	try {
		const response = await stripe.customers.search({
			query: `name: '${userName}'`,
		})

		const customers = response.data;

		if (customers && customers.length > 0) {
			return res.status(200).json({
				customer: customers,
			});	
		} else {
			return res.status(404).json({ error: 'Customer not found' });
		}

	} catch (err) {
		return res.status(500).json({ error: 'Erro ao buscar cliente no stripe' });
	}	
}