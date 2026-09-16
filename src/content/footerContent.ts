export interface FooterLink {
  id: string;
  label: string;
  url: string;
}

export const footerContent = {
  hours: {
    display: 'Mon–Sun: 11:00 AM – 10:00 PM',
  },
  address: {
    display: '123 Forno Rosso Way, Springfield, ST 00000',
  },
  contact: {
    phoneDisplay: '(555) 123-4567',
    phoneHref: 'tel:+15551234567',
    emailDisplay: 'hello@fornorosso.example',
    emailHref: 'mailto:hello@fornorosso.example',
  },
  socialLinks: [
    { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/fornorosso' },
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/fornorosso' },
    { id: 'twitter', label: 'Twitter', url: 'https://www.twitter.com/fornorosso' },
  ] satisfies FooterLink[],
  legalLinks: [
    { id: 'privacy-policy', label: 'Privacy Policy', url: '/privacy-policy' },
    { id: 'terms-of-service', label: 'Terms of Service', url: '/terms-of-service' },
  ] satisfies FooterLink[],
};
