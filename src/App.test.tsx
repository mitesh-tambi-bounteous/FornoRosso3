import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { CURATED_PIZZAS } from './data/pizzas';

describe('App', () => {
  it('increments the header cart badge when Add to Order is clicked', async () => {
    render(<App />);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    const [firstPizza] = CURATED_PIZZAS;
    const card = screen.getByText(firstPizza.name).closest('article')!;
    const { getByRole } = within(card);
    await userEvent.click(getByRole('button', { name: /add to order/i }));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
  });

  it('accumulates the cart count across clicks on different pizza cards', async () => {
    render(<App />);
    const [firstPizza, secondPizza] = CURATED_PIZZAS;
    const firstCard = screen.getByText(firstPizza.name).closest('article')!;
    const secondCard = screen.getByText(secondPizza.name).closest('article')!;
    await userEvent.click(within(firstCard).getByRole('button', { name: /add to order/i }));
    await userEvent.click(within(secondCard).getByRole('button', { name: /add to order/i }));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
  });
});
