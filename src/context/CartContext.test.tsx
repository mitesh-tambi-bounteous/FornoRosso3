import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CartProvider, useCart } from './CartContext';

function CartProbe() {
  const { count, addItem } = useCart();
  return (
    <div>
      <span data-testid="count">{count}</span>
      <button type="button" onClick={addItem}>
        add
      </button>
    </div>
  );
}

describe('CartContext', () => {
  it('starts at 0 and increments by 1 on each addItem call', async () => {
    render(
      <CartProvider>
        <CartProbe />
      </CartProvider>
    );
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    await userEvent.click(screen.getByRole('button', { name: 'add' }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    await userEvent.click(screen.getByRole('button', { name: 'add' }));
    expect(screen.getByTestId('count')).toHaveTextContent('2');
  });

  it('throws when useCart is called outside a CartProvider', () => {
    expect(() => render(<CartProbe />)).toThrow('useCart must be used within a CartProvider');
  });
});
