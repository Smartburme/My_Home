import React from 'react';
import { APP_NAME, BIcon } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 bg-brand-light-bg shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-1">
        <div className="flex items-center space-x-3">
          <BIcon className="h-8 w-8 sm:h-10 sm:w-10 text-brand-gold" />
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-gold tracking-tight">{APP_NAME}</h1>
        </div>
        <p className="text-xs text-brand-text-muted/70">HyperOS Inspired</p>
      </div>
    </header>
  );
};

export default Header;