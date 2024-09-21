import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import {
	CloseButton,
	Content,
	Overlay,
} from '../styles/components/cartModal'
import { Cart } from './cart'
import { CompleteRegistration } from './compleRegistration'

export function CartModal() {
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
			setIsCompleteRegistrationMode(true);
			/* setIsCreatingCheckoutSession(true);

			const cartItems = getCartItems();

			const response = await axios.post('/api/checkout', { cartItems })

			const { checkoutUrl } = response.data;

			window.location.href = checkoutUrl
			clearCart(); */
		} catch (err) {
			/* setIsCreatingCheckoutSession(false);
			alert('Falha ao redirecionar ao checkout!') */
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