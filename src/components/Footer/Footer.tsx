import { footerContent } from '../../content/footerContent';
import styles from './Footer.module.css';

export function Footer() {
  const { hours, address, contact, socialLinks, legalLinks } = footerContent;

  return (
    <footer className={styles.footer}>
      <div className={styles.section}>
        <h2 className={styles.heading}>Kitchen Hours</h2>
        <p>{hours.display}</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Location</h2>
        <address className={styles.address}>{address.display}</address>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Contact</h2>
        <p>
          <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
        </p>
        <p>
          <a href={contact.emailHref}>{contact.emailDisplay}</a>
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Follow Us</h2>
        <ul className={styles.linkList}>
          {socialLinks.map(link => (
            <li key={link.id}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Legal</h2>
        <ul className={styles.linkList}>
          {legalLinks.map(link => (
            <li key={link.id}>
              <a href={link.url}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
