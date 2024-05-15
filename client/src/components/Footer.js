import React from 'react';
import styles from '../styles/Footer.module.css'; // Create a new CSS file for styling

const Footer = () => {
  return (
    
    <footer className={`${styles.footer} bg-blue-900 text-gray-200 p-4 text-center shadow-md fixed bottom-0 w-full`}>
    <p>&copy; 2024 CuhHUB. All rights reserved.</p>
</footer>
  );
};

export default Footer;
