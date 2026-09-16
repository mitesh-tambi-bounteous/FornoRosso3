export interface FooterLink {
  id: string;
  label: string;
  url: string;
}

export const footerContent = {
  hours: {
    display: 'Mon–Thu 11am–9pm, Fri–Sat 11am–10pm, Sun 12pm–8pm',
  },
  address: {
    display: '482 Elm Street, Riverside, CA 92501',
  },
  contact: {
    phoneDisplay: '(951) 555-0142',
    phoneHref: 'tel:+19515550142',
    emailDisplay: 'info@fornorossopizzeria.com',
    emailHref: 'mailto:info@fornorossopizzeria.com',
  },
  socialLinks: [
    { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/fornorossopizzeria' },
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/fornorossopizzeria' },
    { id: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@fornorossopizzeria' },
  ] satisfies FooterLink[],
  legalLinks: [
    { id: 'privacy-policy', label: 'Privacy Policy', url: '/privacy-policy' },
    { id: 'terms-of-service', label: 'Terms of Service', url: '/terms-of-service' },
  ] satisfies FooterLink[],
};
