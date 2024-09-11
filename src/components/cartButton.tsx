import * as Dialog from '@radix-ui/react-dialog';
import { Tote } from "phosphor-react";
import { useShoppingCart } from 'use-shopping-cart';
import { CartModal } from '../components/cartModal';
import { Button } from '../styles/pages/cartButton';

export function CartButton() {
	const { cartDetails } = useShoppingCart()

	const cartCount = cartDetails
		? Object.keys(cartDetails).length
		: 0;

	return (
		<Dialog.Root>
		<Dialog.Trigger asChild>
			<Button>
				<Tote size={32} weight="bold" />
				{cartCount > 0 && (
					<div>{cartCount}</div>
				)}
			</Button>
		</Dialog.Trigger>
		<CartModal />
	</Dialog.Root>
	)
}