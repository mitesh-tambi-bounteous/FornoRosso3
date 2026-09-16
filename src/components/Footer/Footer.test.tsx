import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { footerContent } from '../../content/footerContent';

test('renders hours, address, contact, social links, and legal links', () => {
  render(<Footer />);
  expect(screen.getByText(footerContent.hours.display)).toBeInTheDocument();
  expect(screen.getByText(footerContent.address.display)).toBeInTheDocument();
  expect(screen.getByText(footerContent.contact.phoneDisplay)).toBeInTheDocument();
  footerContent.socialLinks.forEach(link =>
    expect(screen.getByRole('link', { name: link.label })).toBeInTheDocument()
  );
  footerContent.legalLinks.forEach(link =>
    expect(screen.getByRole('link', { name: link.label })).toBeInTheDocument()
  );
});

test('displays the exact configured hours, address, and contact details', () => {
  render(<Footer />);
  expect(screen.getByText('Mon–Thu 11am–9pm, Fri–Sat 11am–10pm, Sun 12pm–8pm')).toBeInTheDocument();
  expect(screen.getByText('482 Elm Street, Riverside, CA 92501')).toBeInTheDocument();
  expect(screen.getByText('(951) 555-0142')).toBeInTheDocument();
});

test('each social and legal link has the correct href', () => {
  render(<Footer />);
  footerContent.socialLinks.forEach(link => {
    expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.url);
  });
  footerContent.legalLinks.forEach(link => {
    expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.url);
  });
});
