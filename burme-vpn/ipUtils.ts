
import { IPDetails } from '../types';

export const generateFakeUserIp = (): IPDetails => {
  // Simulate a realistic local ISP IP range for Myanmar for thematic consistency
  const octet1 = 110; // Common ISP block in MM
  const octet2 = Math.floor(Math.random() * 20) + 160; // 160-179 range
  const octet3 = Math.floor(Math.random() * 256);
  const octet4 = Math.floor(Math.random() * 254) + 1;
  return {
    ip: `${octet1}.${octet2}.${octet3}.${octet4}`,
    city: "Yangon", // Mock city
    country: "Myanmar" // Mock country
  };
};

export const generateFakeServerIp = (): string => {
  // Simulate a generic server IP
  const octet1 = Math.floor(Math.random() * 200) + 10; // Avoid 0, 127, 224+
  const octet2 = Math.floor(Math.random() * 256);
  const octet3 = Math.floor(Math.random() * 256);
  const octet4 = Math.floor(Math.random() * 254) + 1;
  return `${octet1}.${octet2}.${octet3}.${octet4}`;
};

export const getCountryFlagEmoji = (countryCode: string): string => {
  if (!countryCode || countryCode.length !== 2) return '🌐'; // Default globe emoji
  try {
    return String.fromCodePoint(
      ...countryCode
        .toUpperCase()
        .split('')
        .map(char => 0x1F1E6 + char.charCodeAt(0) - 'A'.charCodeAt(0))
    );
  } catch (e) {
    return '🏳️'; // Default white flag on error
  }
};
