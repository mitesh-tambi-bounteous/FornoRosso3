import { render } from '@testing-library/react';
import { Footer } from './Footer';

test('no footer text node is clipped by overflow at 320px viewport', () => {
  window.innerWidth = 320;
  const { container } = render(<Footer />);
  const footerEl = container.querySelector('footer') as HTMLElement;
  expect(footerEl.scrollWidth).toBeLessThanOrEqual(320);
});

test('footer root has no explicit width wider than the viewport', () => {
  const { container } = render(<Footer />);
  const footerEl = container.querySelector('footer') as HTMLElement;
  expect(footerEl).toHaveStyle({ maxWidth: '100%' });
});
