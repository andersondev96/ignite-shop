import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import { X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { AuthContext } from '../contexts/AuthContext'
import {
	CloseButton,
	Content,
	Overlay,
} from '../styles/components/cartModal'
import { Cart } from './cart'
import { CompleteRegistration } from './compleRegistration'

export function CartModal() {
	const { user } = useContext(AuthContext);

	const [isCompleteRegistrationMode, setIsCompleteRegistrationMode] = useState(false);

	const { cartDetails, clearCart } = useShoppingCart()

	const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

	const getCartItems = () => {
		return Object.keys(cartDetails).map((itemId) => {
			const item = cartDetails[itemId]

			return {
				name: item.name,
				image: item.image,
				price: item.price,
				quantity: item.quantity
			}
		});
	}

	async function handleBuyCart() {
		try {
			const { data: customerData, status } = await axios.post('/api/stripe-customer', { userName: user.name });

			if (status === 200 && customerData.customer && customerData.customer.length > 0) {
				const customer = customerData.customer[0]

				console.log(customer)
				setIsCreatingCheckoutSession(true);

				const cartItems = getCartItems();

				const response = await axios.post('/api/checkout', { cartItems, customer: customer.id })

				const { checkoutUrl } = response.data;

				window.location.href = checkoutUrl
				
				clearCart();

			} else if (status === 404) {
				setIsCompleteRegistrationMode(true);
				console.error('Cliente não encontrado. Complete seu cadastro.');
			}

		} catch (err) {
			setIsCreatingCheckoutSession(false);
			alert('Falha ao redirecionar ao checkout!')
		}
	}

	return (
		<Dialog.Portal>
			<Overlay />

			<Content>
				<Dialog.Title>{isCompleteRegistrationMode ? 'Completar cadastro' : 'Carrinho de compras'}</Dialog.Title>
				<CloseButton>
					<X size={24} />
				</CloseButton>
				{isCompleteRegistrationMode ? (
					<CompleteRegistration />
				) : (

					<Cart onBuyCart={handleBuyCart} disabledButtonFinish={isCreatingCheckoutSession} />

				)}
			</Content>

		</Dialog.Portal>
	)
}