import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Winifred Fasuyi</h3>
          <p>Inspiring women of faith and nurturing children in Christ</p>
        </div>
        
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/books">Books</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h4>Connect</h4>
          <a 
            href="https://www.instagram.com/winifredfasuyi?igsh=Y21wZzNzM2EzejV3" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            Instagram
          </a>
        </div>
        
        <div className={styles.footerSection}>
          <h4>Stay Updated</h4>
          <p>Subscribe to my newsletter for updates and inspiration</p>
          <form className={styles.footerForm}>
            <input 
              type="email" 
              placeholder="Your email" 
              className={styles.footerInput}
            />
            <button type="submit" className={styles.footerButton}>Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Winifred Fasuyi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;