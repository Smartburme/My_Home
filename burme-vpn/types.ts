
export interface ServerLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2
}

export enum ConnectionStatus {
  DISCONNECTED = "Disconnected",
  CONNECTING = "Connecting...",
  CONNECTED = "Connected",
  DISCONNECTING = "Disconnecting...",
  ERROR = "Error",
}

export interface IPDetails {
  ip: string;
  city?: string;
  country?: string;
}
