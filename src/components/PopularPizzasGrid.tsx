import { CURATED_PIZZAS } from '../data/pizzas';
import { PizzaCard } from './PizzaCard';
import styles from './PopularPizzasGrid.module.css';

export function PopularPizzasGrid() {
  return (
    <div data-testid="popular-pizzas-grid" className={styles.grid}>
      {CURATED_PIZZAS.map((pizza) => (
        <PizzaCard key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}
