
import React from 'react';
import { ConnectionStatus, IPDetails, ServerLocation } from '../types';
import { GlobeAltIcon } from '../constants';
import { getCountryFlagEmoji } from '../utils/ipUtils';


interface StatusDisplayProps {
  status: ConnectionStatus;
  userIpDetails: IPDetails | null;
  connectedServerDetails: { server: ServerLocation; ip: string } | null;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, userIpDetails, connectedServerDetails }) => {
  let statusText: string = status;
  let statusColorClass: string = 'text-brand-text-muted';
  let ipInfo: React.ReactNode = null;
  let serverInfo: React.ReactNode = null;
  
  const connectingAnimation = status === ConnectionStatus.CONNECTING || status === ConnectionStatus.DISCONNECTING ? 'animate-pulse-fast' : '';

  switch (status) {
    case ConnectionStatus.CONNECTED:
      statusText = 'Securely Connected';
      statusColorClass = 'text-brand-secondary';
      if (connectedServerDetails) {
        serverInfo = (
          <div className="mt-2 text-center">
            <p className="text-sm text-brand-text-muted">Connected to:</p>
            <p className="text-lg font-semibold text-brand-text">
              {getCountryFlagEmoji(connectedServerDetails.server.countryCode)} {connectedServerDetails.server.city}, {connectedServerDetails.server.country}
            </p>
            <p className="text-xs text-brand-text-muted">IP: {connectedServerDetails.ip}</p>
          </div>
        );
      }
      break;
    case ConnectionStatus.DISCONNECTED:
      statusColorClass = 'text-amber-500'; // Gold for disconnected, but not error
      if (userIpDetails) {
        ipInfo = (
          <div className="mt-2 text-center">
            <p className="text-sm text-brand-text-muted">Your current IP:</p>
            <p className="text-lg font-semibold text-brand-text">
              {userIpDetails.ip} ({getCountryFlagEmoji('MM')} {userIpDetails.city}, {userIpDetails.country})
            </p>
          </div>
        );
      }
      break;
    case ConnectionStatus.CONNECTING:
      statusColorClass = 'text-brand-primary';
      break;
    case ConnectionStatus.DISCONNECTING:
      statusColorClass = 'text-amber-400';
      break;
    case ConnectionStatus.ERROR:
      statusText = 'Connection Error';
      statusColorClass = 'text-red-500';
      break;
  }

  return (
    <div className="my-8 p-6 bg-brand-light-bg rounded-xl shadow-2xl text-center">
      <div className={`flex items-center justify-center space-x-2 ${connectingAnimation}`}>
        <GlobeAltIcon className={`h-8 w-8 ${statusColorClass}`} />
        <p className={`text-2xl font-semibold ${statusColorClass}`}>{statusText}</p>
      </div>
      {status === ConnectionStatus.CONNECTED && serverInfo}
      {status === ConnectionStatus.DISCONNECTED && ipInfo}
      {(status === ConnectionStatus.CONNECTING || status === ConnectionStatus.DISCONNECTING) && (
        <div className="mt-4 h-1 w-full bg-brand-primary/30 rounded-full overflow-hidden">
          <div className="h-1 bg-brand-primary animate-pulse w-1/2 mx-auto"></div>
        </div>
      )}
    </div>
  );
};

export default StatusDisplay;
