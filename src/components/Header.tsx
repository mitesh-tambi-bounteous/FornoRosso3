import { useCart } from '../context/CartContext';

export function Header() {
  const { count } = useCart();

  return (
    <header>
      <span>Cart</span>
      <span data-testid="cart-count">{count}</span>
    </header>
  );
}
