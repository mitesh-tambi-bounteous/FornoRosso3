import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CartProvider } from '../context/CartContext';
import { Header } from './Header';

describe('Header', () => {
  it('renders a cart badge starting at 0', () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>
    );
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });
});
