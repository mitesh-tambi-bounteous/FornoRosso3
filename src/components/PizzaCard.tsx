import { useState } from 'react';
import type { Pizza } from '../data/pizzas';
import { useCart } from '../context/CartContext';
import styles from './PizzaCard.module.css';

const DOUBLE_CLICK_GUARD_MS = 500;

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function PizzaCard({ pizza }: { pizza: Pizza }) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  function handleAddToOrder() {
    addItem();
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), DOUBLE_CLICK_GUARD_MS);
  }

  return (
    <article className={styles.card}>
      <h3>{pizza.name}</h3>
      <p>{formatPrice(pizza.price)}</p>
      <p>{pizza.description}</p>
      <button type="button" onClick={handleAddToOrder} disabled={isAdding}>
        Add to Order
      </button>
    </article>
  );
}
