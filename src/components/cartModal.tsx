import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { formatCurrencyString } from 'use-shopping-cart/core'
import { ButtonContainer, CloseButton, Content, EmptyCartMessage, FooterContainer, ImageContainer, ItemContainer, ItemsContainer, Overlay, ProductsContainer } from '../styles/pages/cartModal'

export function CartModal() {
	const { totalPrice, cartDetails, removeItem, clearCart } = useShoppingCart()

	const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

	const cartCount = cartDetails ? Object.keys(cartDetails).length : 0;

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
			setIsCreatingCheckoutSession(true);

			const cartItems = getCartItems();
	
			const response = await axios.post('/api/checkout', { cartItems })

			const { checkoutUrl } = response.data;

			window.location.href = checkoutUrl
			clearCart();
		} catch (err) {
			setIsCreatingCheckoutSession(false);
			alert('Falha ao redirecionar ao checkout!')
		}
	}


	return (
		<Dialog.Portal>
			<Overlay />

			<Content>
				<Dialog.Title>Carrinho de compras</Dialog.Title>

				<CloseButton>
					<X size={24} />
				</CloseButton>

				{cartCount === 0 ? (
					<EmptyCartMessage>O carrinho está vazio</EmptyCartMessage>
				) : (
					<ProductsContainer>
						<ItemsContainer>
							{
								Object.keys(cartDetails).map((itemId) => {
									const item = cartDetails[itemId]

									return (
										<ItemContainer key={item.id}>
											<ImageContainer>
												<Image src={item.image} alt={item.name} width={64} height={64} />
											</ImageContainer>
											<div>
												<span>{item.name}</span>
												<span>{item.quantity}x</span>
												<strong>{formatCurrencyString({ value: item.price, currency: item.currency })}</strong>
												<button onClick={() => removeItem(item.id)}>Remover</button>
											</div>
										</ItemContainer>
									)
								})
							}

						</ItemsContainer>

						<FooterContainer>
							<div>
								<span>Quantidade:</span>
								<p>{cartCount} {cartCount > 1 ? 'items' : 'item'}</p>
							</div>

							<div>
								<strong>Valor total:</strong>
								<p>{formatCurrencyString({ value: totalPrice, currency: 'BRL' })}</p>
							</div>

							<ButtonContainer onClick={handleBuyCart} disabled={isCreatingCheckoutSession}>
								{isCreatingCheckoutSession ? 'Processando...' : 'Finalizar compra'}
							</ButtonContainer>
						</FooterContainer>
					</ProductsContainer>
				)}


			</Content>
		</Dialog.Portal>
	)
}