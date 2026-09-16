import { describe, expect, it } from 'vitest';
import { CURATED_PIZZAS } from './pizzas';

describe('CURATED_PIZZAS', () => {
  it('is a fixed, non-empty hardcoded list', () => {
    expect(Array.isArray(CURATED_PIZZAS)).toBe(true);
    expect(CURATED_PIZZAS.length).toBe(6);
  });

  it('contains fully-populated pizza entries', () => {
    CURATED_PIZZAS.forEach((pizza) => {
      expect(pizza.id).toBeTruthy();
      expect(pizza.name).toBeTruthy();
      expect(typeof pizza.price).toBe('number');
      expect(pizza.description).toBeTruthy();
    });
  });
});
