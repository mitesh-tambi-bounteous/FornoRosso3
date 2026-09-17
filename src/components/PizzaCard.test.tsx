import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CartProvider } from '../context/CartContext';
import { PizzaCard } from './PizzaCard';

const pizza = {
  id: 'margherita',
  name: 'Margherita',
  price: 12.5,
  description: 'Tomato, mozzarella, basil',
};

function renderCard() {
  return render(
    <CartProvider>
      <PizzaCard pizza={pizza} />
    </CartProvider>
  );
}

describe('PizzaCard', () => {
  it('shows name, price, and description', () => {
    renderCard();
    expect(screen.getByText('Margherita')).toBeInTheDocument();
    expect(screen.getByText('$12.50')).toBeInTheDocument();
    expect(screen.getByText('Tomato, mozzarella, basil')).toBeInTheDocument();
  });

  it('shows no toast or modal confirmation after Add to Order is clicked', async () => {
    renderCard();
    await userEvent.click(screen.getByRole('button', { name: /add to order/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByText(/added to (your )?order/i)).not.toBeInTheDocument();
  });

  it('briefly disables the Add to Order button after a click to prevent double-clicks', async () => {
    renderCard();
    const button = screen.getByRole('button', { name: /add to order/i });
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    expect(button).toBeDisabled();
  });

  it('re-enables the Add to Order button shortly after the click', async () => {
    renderCard();
    const button = screen.getByRole('button', { name: /add to order/i });
    await userEvent.click(button);
    expect(button).toBeDisabled();
    await waitFor(() => expect(button).not.toBeDisabled());
  });
});
