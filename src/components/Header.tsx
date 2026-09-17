import { useCart } from '../context/CartContext';
import styles from './Header.module.css';

export function Header() {
  const { count } = useCart();
  const isEmpty = count === 0;

  return (
    <header>
      <span>Cart</span>
      <span
        data-testid="cart-count"
        className={isEmpty ? `${styles.badge} ${styles.badgeDisabled}` : styles.badge}
        aria-disabled={isEmpty}
      >
        {count}
      </span>
    </header>
  );
}
