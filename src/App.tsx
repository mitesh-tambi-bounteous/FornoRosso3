import { CartProvider } from './context/CartContext';
import { Home } from './pages/Home';

export function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}
