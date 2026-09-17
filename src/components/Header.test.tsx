import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CartProvider, useCart } from '../context/CartContext';
import { Header } from './Header';

function AddItemButton() {
  const { addItem } = useCart();
  return (
    <button type="button" onClick={addItem}>
      add
    </button>
  );
}

describe('Header', () => {
  it('renders a cart badge starting at 0', () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>
    );
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });

  it('disables the cart badge when there are no items', () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>
    );
    expect(screen.getByTestId('cart-count')).toHaveAttribute('aria-disabled', 'true');
  });

  it('enables the cart badge once an item has been added', async () => {
    render(
      <CartProvider>
        <Header />
        <AddItemButton />
      </CartProvider>
    );
    await userEvent.click(screen.getByRole('button', { name: 'add' }));
    expect(screen.getByTestId('cart-count')).toHaveAttribute('aria-disabled', 'false');
  });

  it('renders the cart badge in green once an item has been added', async () => {
    render(
      <CartProvider>
        <Header />
        <AddItemButton />
      </CartProvider>
    );
    await userEvent.click(screen.getByRole('button', { name: 'add' }));
    const badge = screen.getByTestId('cart-count');
    expect(getComputedStyle(badge).backgroundColor).toBe('rgb(46, 125, 50)');
  });
});
