import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import { Container } from "../styles/pages/app";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartProvider } from "use-shopping-cart";
import { Header } from "../components/header";
import { AuthContextProvider } from "../contexts/AuthContext";

globalStyles()

function App({ Component, pageProps }: AppProps) {

  return (
    <AuthContextProvider>
      <CartProvider
        cartMode="checkout-session"
        stripe={process.env.STRIPE_PUBLIC_KEY}
        currency="BRL"
        loading={<p aria-live="polite">Loading redux-persist...</p>}
        shouldPersist
      >
        <Container>
          <Header />
          <ToastContainer />
          <Component {...pageProps} />
        </Container>
      </CartProvider>
    </AuthContextProvider>
  );
}

export default App
