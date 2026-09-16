import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CartProvider } from '../context/CartContext';
import { CURATED_PIZZAS } from '../data/pizzas';
import { PopularPizzasGrid } from './PopularPizzasGrid';

function renderGrid() {
  return render(
    <CartProvider>
      <PopularPizzasGrid />
    </CartProvider>
  );
}

describe('PopularPizzasGrid', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders every curated pizza card with no carousel controls', () => {
    renderGrid();
    CURATED_PIZZAS.forEach((pizza) => {
      expect(screen.getByText(pizza.name)).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
    const container = screen.getByTestId('popular-pizzas-grid');
    expect(container.className).not.toMatch(/carousel|scroll-x|nowrap/i);
  });

  it('never calls fetch to source pizzas', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    renderGrid();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('uses a reflowing CSS grid, never a fixed column count or clipped overflow', () => {
    renderGrid();
    const container = screen.getByTestId('popular-pizzas-grid');
    const styles = getComputedStyle(container);
    expect(styles.display).toBe('grid');
    expect(styles.overflowX).not.toBe('scroll');
  });
});
