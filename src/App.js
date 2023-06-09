import { useState } from "react";
import Header from "./components/Layout/Header/Header";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";
import CartProvider from "./state/Cart-provider";

function App() {
  const [cartIsShowing, setCartIsShowing] = useState(false);

  const showCartHandler = () => {
    setCartIsShowing(true);
  }

  const hiddeCartHandler = () => {
    setCartIsShowing(false);
  }

  return (
    <CartProvider>
      { cartIsShowing && <Cart onClose={hiddeCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Menu />
      </main>
    </CartProvider>
  );
}

export default App;
