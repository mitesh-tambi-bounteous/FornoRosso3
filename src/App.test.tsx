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
});
