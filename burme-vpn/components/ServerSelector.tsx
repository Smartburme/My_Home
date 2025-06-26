
import React,  { useState, useRef, useEffect } from 'react';
import { ServerLocation } from '../types';
import { ChevronDownIcon, GlobeAltIcon } from '../constants';
import { getCountryFlagEmoji } from '../utils/ipUtils';

interface ServerSelectorProps {
  servers: ServerLocation[];
  selectedServer: ServerLocation | null;
  onChange: (server: ServerLocation) => void;
  disabled: boolean;
}

const ServerSelector: React.FC<ServerSelectorProps> = ({ servers, selectedServer, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (server: ServerLocation) => {
    onChange(server);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-3 bg-brand-light-bg border border-brand-text-muted/30 rounded-lg shadow-sm text-left
                    focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                    transition-colors duration-150 ease-in-out
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-700'}`}
      >
        <span className="flex items-center">
          {selectedServer ? (
            <>
              <span className="text-xl mr-3">{getCountryFlagEmoji(selectedServer.countryCode)}</span>
              <span className="block truncate text-brand-text">{selectedServer.name}</span>
            </>
          ) : (
            <>
              <GlobeAltIcon className="h-5 w-5 mr-3 text-brand-text-muted" />
              <span className="text-brand-text-muted">Select a server...</span>
            </>
          )}
        </span>
        <ChevronDownIcon className={`h-5 w-5 text-brand-text-muted transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-brand-light-bg border border-brand-text-muted/30 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {servers.map((server) => (
              <li
                key={server.id}
                onClick={() => handleSelect(server)}
                className={`px-4 py-3 flex items-center space-x-3 cursor-pointer hover:bg-slate-700 text-brand-text
                            ${selectedServer?.id === server.id ? 'bg-slate-700 font-semibold' : ''}`}
              >
                <span className="text-xl">{getCountryFlagEmoji(server.countryCode)}</span>
                <span>{server.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServerSelector;
