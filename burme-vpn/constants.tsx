
import { ServerLocation } from './types';

export const APP_NAME = "Burme VPN";

export const MOCK_SERVERS: ServerLocation[] = [
  { id: 'mm-ygn', name: 'Yangon - Secure', city: 'Yangon', country: 'Myanmar', countryCode: 'MM' },
  { id: 'sg-sin', name: 'Singapore - Fast', city: 'Singapore', country: 'Singapore', countryCode: 'SG' },
  { id: 'us-nyc', name: 'New York - USA', city: 'New York', country: 'USA', countryCode: 'US' },
  { id: 'jp-tok', name: 'Tokyo - Japan', city: 'Tokyo', country: 'Japan', countryCode: 'JP' },
  { id: 'de-fra', name: 'Frankfurt - Germany', city: 'Frankfurt', country: 'Germany', countryCode: 'DE' },
  { id: 'gb-lon', name: 'London - UK', city: 'London', country: 'United Kingdom', countryCode: 'GB' },
  { id: 'us-lax-tiktok', name: 'Los Angeles - TikTok Optimized', city: 'Los Angeles', country: 'USA', countryCode: 'US' },
  { id: 'kr-sel-gaming', name: 'Seoul - Low Latency Gaming', city: 'Seoul', country: 'South Korea', countryCode: 'KR' },
];

export const BIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.528 3.621c- Tilly .711-1.313 1.286-1.722 1.728-.803.864-.861 1.077-.861 3.03V10H8.5c-1.933 0-2.5.35-2.5 1.5s.567 1.5 2.5 1.5H10v1.615c0 1.51.107 2.054.664 3.398.396.957.943 1.696 1.706 2.298.54.426 1.23.668 1.947.668.784 0 1.399-.291 1.93-.927.427-.497.644-1.01.748-1.748.05-.36.053-.87.053-4.105V13h.643c.971 0 1.607-.224 1.957-.68.42-.547.452-1.041.205-3.155-.115-.98-.328-1.636-.677-2.079-.652-.825-1.571-1.265-2.651-1.265h-.624V4.938c0-1.045-.234-1.624-.764-1.912-.31-.168-.79-.205-1.229-.098-.12.03-.31.11-.42.176l-.18.107-.11.06Z"/>
  </svg>
);


export const ShieldIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12.012 2.25c.499 0 .981.089 1.436.255 2.859 1.258 5.143 3.287 6.64 5.922.742 1.321 1.137 2.802 1.137 4.311 0 1.95-.506 3.868-1.456 5.565a10.45 10.45 0 0 1-2.9 3.667.118.118 0 0 1-.06.027c-.033.01-.068.016-.102.016-.033 0-.068-.006-.102-.016a.118.118 0 0 1-.06-.027 10.45 10.45 0 0 1-2.901-3.667A10.518 10.518 0 0 1 7.25 12.738c0-1.51.394-2.99 1.136-4.31 1.498-2.636 3.782-4.664 6.64-5.922A10.573 10.573 0 0 1 12.012 2.25Zm-.373 5.43c.091-.044.188-.068.286-.068.182 0 .35.077.468.204l2.427 2.763a.75.75 0 0 1-.005 1.055l-.01.01-4.148 3.96a.75.75 0 0 1-1.04-.055l-2.073-2.503a.75.75 0 0 1 1.125-.934l1.464 1.765 3.498-3.342a.75.75 0 0 1 .467-.19Z" clipRule="evenodd" />
  </svg>
);

export const PowerIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0V6Z" clipRule="evenodd" />
    <path d="M12.001 15a4.502 4.502 0 0 0 4.237-6.195.75.75 0 0 1 .438-1.006 6.002 6.002 0 0 1 1.053 10.916A6.002 6.002 0 0 1 7.25 12.75a.75.75 0 0 1 .438 1.006A4.502 4.502 0 0 0 12.001 15Z" />
  </svg>
);

export const GlobeAltIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.262 3.654a.75.75 0 0 0-.525-.224 9.696 9.696 0 0 0-1.685.738A9.713 9.713 0 0 0 3.75 12c0 1.956.574 3.784 1.56 5.253a.75.75 0 0 0 1.295-.749A8.213 8.213 0 0 1 5.25 12a8.217 8.217 0 0 1 2.373-5.698.75.75 0 0 0 .114-.993.75.75 0 0 0-.475-.355Zm8.003-.002a.75.75 0 0 1 .475.355.75.75 0 0 1-.114.993A8.217 8.217 0 0 0 18.75 12c0 2.22.888 4.248 2.316 5.748a.75.75 0 0 1-1.295.749A9.713 9.713 0 0 1 20.25 12a9.713 9.713 0 0 1-2.298-6.182 9.696 9.696 0 0 1 1.685-.738.75.75 0 0 1 .525.224ZM12.75 5.233A8.23 8.23 0 0 0 12 5.25a8.23 8.23 0 0 0-.75.017.75.75 0 0 0-.742.815 8.21 8.21 0 0 0 .002 6.868.75.75 0 0 0 .742.815c.25.011.5.017.75.017a8.23 8.23 0 0 0 .75-.017.75.75 0 0 0 .742-.815 8.21 8.21 0 0 0-.002-6.868.75.75 0 0 0-.742-.815Z" clipRule="evenodd" />
  </svg>
);


export const ChevronDownIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
);