import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cartItems } = req.body;

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed.' })	
	}

	if (!cartItems || cartItems.length === 0) {
		return res.status(400).json({ error: 'No items in the cart.' })	
	}

	const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
	const cancelUrl = `${process.env.NEXT_URL}/`;

	try {
		const lineItems = cartItems.map((item) => {
			return {
				price_data: {
					currency: 'BRL',
					product_data: {
						name: item.name,
						images: [item.image]
					},
					unit_amount: item.price,
				},
				quantity: item.quantity
			}
		})

		const checkoutSession = await stripe.checkout.sessions.create({
			success_url: successUrl,
			cancel_url: cancelUrl,
			mode: 'payment',
			line_items: lineItems
		})

		return res.status(201).json({
			checkoutUrl: checkoutSession.url,
		});

	} catch (err) {
		return res.status(500).json({ error: 'Failed to create checkout session' });
	}

	

	
}