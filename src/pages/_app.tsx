import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import { Container } from "../styles/pages/app";

import { CartProvider } from "use-shopping-cart";
import { Header } from "../components/header";

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
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}

export default App
