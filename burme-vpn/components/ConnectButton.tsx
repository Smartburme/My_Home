
import React from 'react';
import { ConnectionStatus } from '../types';
import { PowerIcon } from '../constants';

interface ConnectButtonProps {
  status: ConnectionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
  disabled: boolean;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ status, onConnect, onDisconnect, disabled }) => {
  const isConnecting = status === ConnectionStatus.CONNECTING;
  const isDisconnecting = status === ConnectionStatus.DISCONNECTING;
  const isConnected = status === ConnectionStatus.CONNECTED;

  let buttonText = 'Connect';
  let buttonColorClass = 'bg-brand-primary hover:bg-sky-500';
  let Icon = <PowerIcon className="h-8 w-8 mr-3" />;

  if (isConnected) {
    buttonText = 'Disconnect';
    buttonColorClass = 'bg-red-600 hover:bg-red-700';
  } else if (isConnecting) {
    buttonText = 'Connecting...';
    buttonColorClass = 'bg-brand-primary opacity-75';
    Icon = <PowerIcon className="h-8 w-8 mr-3 animate-spin" />;
  } else if (isDisconnecting) {
    buttonText = 'Disconnecting...';
    buttonColorClass = 'bg-amber-600 opacity-75';
     Icon = <PowerIcon className="h-8 w-8 mr-3 animate-ping" />;
  }


  const handleClick = () => {
    if (isConnected) {
      onDisconnect();
    } else {
      onConnect();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isConnecting || isDisconnecting}
      className={`w-full max-w-xs mx-auto flex items-center justify-center py-4 px-6 
                  border border-transparent rounded-full shadow-lg text-xl font-semibold text-white 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark-bg 
                  transition-all duration-300 ease-in-out transform hover:scale-105
                  ${buttonColorClass} 
                  ${(disabled || isConnecting || isDisconnecting) ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {Icon}
      {buttonText}
    </button>
  );
};

export default ConnectButton;
