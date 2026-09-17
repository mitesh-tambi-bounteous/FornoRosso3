import type { Pizza } from '../data/pizzas';
import { useCart } from '../context/CartContext';
import styles from './PizzaCard.module.css';

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function PizzaCard({ pizza }: { pizza: Pizza }) {
  const { addItem } = useCart();

  return (
    <article className={styles.card}>
      <h3>{pizza.name}</h3>
      <p>{formatPrice(pizza.price)}</p>
      <p>{pizza.description}</p>
      <button type="button" onClick={addItem}>
        Add to Order
      </button>
    </article>
  );
}
