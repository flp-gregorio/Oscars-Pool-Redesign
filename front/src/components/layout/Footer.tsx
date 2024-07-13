import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Made by <a href="https://github.com/flp-gregorio/" target="_blank">Felipe Gregorio</a></p>
      <p className={styles.subtext}>© Copyright 2024. All rights reserved.</p>
    </footer>
  );
};

export default Footer;