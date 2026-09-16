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
  expect(screen.getByText('Mon–Sun: 11:00 AM – 10:00 PM')).toBeInTheDocument();
  expect(screen.getByText('123 Forno Rosso Way, Springfield, ST 00000')).toBeInTheDocument();
  expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
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
