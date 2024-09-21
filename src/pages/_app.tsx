

import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import logoImg from '../assets/logo.svg';
import { AuthButton } from "../components/authButton";
import { CartButton } from "../components/cartButton";
import { ButtonsContainer, Container, Header } from "../styles/pages/app";

import Image from 'next/image';
import Link from "next/link";
import { CartProvider } from "use-shopping-cart";

globalStyles()

function App({ Component, pageProps }: AppProps) {

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
            <ButtonsContainer>
            <CartButton />
            <AuthButton />
            </ButtonsContainer>

        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}

export default App
