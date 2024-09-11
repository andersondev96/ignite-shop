

import { AppProps } from "next/app";
import Image from 'next/image';
import Link from "next/link";
import { CartProvider } from "use-shopping-cart";
import logoImg from '../assets/logo.svg';
import { CartButton } from "../components/cartButton";
import { globalStyles } from "../styles/global";
import { Container, Header } from "../styles/pages/app";


globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.STRIPE_PUBLIC_KEY}
      currency="BRL"
      loading={<p aria-live="polite">Loading redux-persist...</p>}
      shouldPersist
    >
      <Container>
        <Header>
          <Link href="/" prefetch={false}>
            <Image src={logoImg} alt="" />
          </Link>
            <CartButton />

        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}
