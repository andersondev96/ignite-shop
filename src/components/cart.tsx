import Image from "next/image"
import { Minus, Plus } from "phosphor-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
import { ButtonContainer, EmptyCartMessage, FooterContainer, ImageContainer, ItemContainer, ItemsContainer, ProductsContainer, Quantity } from "../styles/components/cart"


interface CartProps {
	onBuyCart: () => {}
	disabledButtonFinish: boolean
}

export function Cart({onBuyCart, disabledButtonFinish}: CartProps) {
	const { totalPrice, cartDetails, removeItem, clearCart } = useShoppingCart()

	const cartCount = cartDetails ? Object.keys(cartDetails).length : 0;


	return (
		
		<>
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
												<Quantity>
												<span>{item.quantity}x</span>
												<Plus size={16} />
												<Minus size={16} />
												</Quantity>
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

							<ButtonContainer onClick={onBuyCart} disabled={disabledButtonFinish}>
								{disabledButtonFinish ? 'Processando...' : 'Finalizar compra'}
							</ButtonContainer>
						</FooterContainer>
					</ProductsContainer>
				)}
		</>	
	)
}