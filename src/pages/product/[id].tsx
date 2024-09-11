import * as Dialog from '@radix-ui/react-dialog'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { CartModal } from '../../components/cartModal'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'

interface ProductProps {
	product: {
		id: string;
    name: string;
    imageUrl: string;
    price: string;
		description: string;
		defaultPriceId: string;
		sku: string
	}
}

export default function Product({ product }: ProductProps) {
	const { addItem } = useShoppingCart()

	function handleAddToCart() {
		addItem({
			id: product.sku,
			name: product.name,
			price: Number(product.price.replace(/\D/g, '')),
			currency: 'BRL',
			image: product.imageUrl
		})

		toast.success("Produto adicionado ao carrinho")
	}

	return (
		<>
		<ToastContainer />
		<Head >
        <title>{product.name} | Ignite Shop</title>
      </Head>
		<ProductContainer>
			<ImageContainer>
				<Image src={product.imageUrl} width={520} height={480} alt="" />
			</ImageContainer>
			<ProductDetails>
				<h1>{product.name}</h1>
				<span>{product.price}</span>

				<p>{product.description}</p>

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<button onClick={handleAddToCart}>Adicionar ao carrinho</button>
					</Dialog.Trigger>
					<CartModal />
				</Dialog.Root>
				
			</ProductDetails>
		</ProductContainer>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	// Buscar os produtos mais vendidos / mais acessados


	return {
		paths: [
			{ params: { id: 'prod_QfCFBlK0rMrPAN' }}
		],
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
	const productId = String(params.id);

	const product = await stripe.products.retrieve(productId, {
		expand: ['default_price'],
	})

	const price = product.default_price as Stripe.Price

	return {
		props: {
			product: {
				id: product.id,
				name: product.name,
				imageUrl: product.images[0],
				price: new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				}).format(price.unit_amount / 100),
				description: product.description,
				defaultPriceId: price.id,
				sku: product.id,
			}
		},
		 revalidate: 60 * 60 * 1 // 1 hour
	}
}