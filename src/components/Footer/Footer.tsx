import type { ReactNode } from 'react';
import { footerContent, type FooterLink } from '../../content/footerContent';
import styles from './Footer.module.css';

function FooterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>
      {children}
    </div>
  );
}

function FooterLinkList({ links, external }: { links: FooterLink[]; external?: boolean }) {
  return (
    <ul className={styles.linkList}>
      {links.map(link => (
        <li key={link.id}>
          <a href={link.url} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  const { hours, address, contact, socialLinks, legalLinks } = footerContent;

  return (
    <footer className={styles.footer}>
      <FooterSection title="Kitchen Hours">
        <p>{hours.display}</p>
      </FooterSection>

      <FooterSection title="Location">
        <address className={styles.address}>{address.display}</address>
      </FooterSection>

      <FooterSection title="Contact">
        <p>
          <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
        </p>
        <p>
          <a href={contact.emailHref}>{contact.emailDisplay}</a>
        </p>
      </FooterSection>

      <FooterSection title="Follow Us">
        <FooterLinkList links={socialLinks} external />
      </FooterSection>

      <FooterSection title="Legal">
        <FooterLinkList links={legalLinks} />
      </FooterSection>
    </footer>
  );
}
