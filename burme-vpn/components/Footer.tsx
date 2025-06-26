
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center bg-brand-light-bg mt-auto">
      <p className="text-sm text-brand-text-muted">
        &copy; {currentYear} Burme VPN. All rights reserved. (Simulated Service)
      </p>
    </footer>
  );
};

export default Footer;