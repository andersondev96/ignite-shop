import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		name,
		email,
		phone,
		document,
		cep,
		address,
		neighborhood,
		complement,
		number,
		state,
		city
	} = req.body;

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed.' })	
	}

	try {
		const customer = await stripe.customers.create({
			name,
			email,
			phone,
			metadata: {
				document
			},
			address: {
				line1: `${address}, ${complement} ${neighborhood}, ${number}`,
				city,
				state,
				postal_code: cep,
				
			}
				
		})

		return res.status(200).json({
			customer
		});

	} catch (err) {
		return res.status(500).json({ error: 'Erro ao buscar cliente no stripe' });
	}	
}