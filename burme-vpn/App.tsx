
import React, { useState, useEffect, useCallback } from 'react';
import { ConnectionStatus, ServerLocation, IPDetails } from './types';
import { MOCK_SERVERS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import StatusDisplay from './components/StatusDisplay';
import ServerSelector from './components/ServerSelector';
import ConnectButton from './components/ConnectButton';
import { generateFakeUserIp, generateFakeServerIp } from './utils/ipUtils';

const App: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [selectedServer, setSelectedServer] = useState<ServerLocation | null>(MOCK_SERVERS[0] || null);
  const [userIpDetails, setUserIpDetails] = useState<IPDetails | null>(null);
  const [connectedServerDetails, setConnectedServerDetails] = useState<{ server: ServerLocation; ip: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUserIpDetails(generateFakeUserIp());
  }, []);

  const handleConnect = useCallback(() => {
    if (!selectedServer) {
      setError("Please select a server before connecting.");
      setCurrentStatus(ConnectionStatus.ERROR);
      setTimeout(() => {
        setError(null);
        if(currentStatus !== ConnectionStatus.CONNECTED && currentStatus !== ConnectionStatus.CONNECTING) {
            setCurrentStatus(ConnectionStatus.DISCONNECTED);
        }
      }, 3000);
      return;
    }
    setError(null);
    setCurrentStatus(ConnectionStatus.CONNECTING);
    
    // Simulate connection delay
    setTimeout(() => {
      const fakeIp = generateFakeServerIp();
      setConnectedServerDetails({ server: selectedServer, ip: fakeIp });
      setCurrentStatus(ConnectionStatus.CONNECTED);
    }, 2500);
  }, [selectedServer, currentStatus]);

  const handleDisconnect = useCallback(() => {
    setCurrentStatus(ConnectionStatus.DISCONNECTING);
    // Simulate disconnection delay
    setTimeout(() => {
      setConnectedServerDetails(null);
      setCurrentStatus(ConnectionStatus.DISCONNECTED);
    }, 1500);
  }, []);

  const handleServerChange = (server: ServerLocation) => {
    if (currentStatus === ConnectionStatus.CONNECTED || currentStatus === ConnectionStatus.CONNECTING) {
      // To change server while connected/connecting, we first disconnect.
      // A more advanced implementation might queue the server change.
      handleDisconnect(); 
      // User will need to click connect again after selecting the new server.
      // Or, we could automatically initiate connection after disconnect and server change.
      // For now, simple disconnect is fine.
    }
    setSelectedServer(server);
    setError(null); 
    if (currentStatus === ConnectionStatus.ERROR) {
        setCurrentStatus(ConnectionStatus.DISCONNECTED); // Reset from error state on server change
    }
  };
  
  const isButtonDisabled = 
    (currentStatus !== ConnectionStatus.CONNECTED && currentStatus !== ConnectionStatus.DISCONNECTED && currentStatus !== ConnectionStatus.ERROR) ||
    (currentStatus === ConnectionStatus.DISCONNECTED && !selectedServer) ||
    (currentStatus === ConnectionStatus.ERROR && !selectedServer);


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-brand-dark-bg via-slate-800 to-brand-dark-bg text-brand-text">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4"> {/* Centering container for the dialog */}
        <div className="w-full max-w-md bg-brand-light-bg/70 backdrop-blur-md rounded-2xl shadow-2xl border border-brand-text-muted/20">
          <div className="p-6 md:p-8 space-y-8"> {/* Inner padding and content flow */}
            <StatusDisplay
              status={error && currentStatus === ConnectionStatus.ERROR ? ConnectionStatus.ERROR : currentStatus}
              userIpDetails={userIpDetails}
              connectedServerDetails={connectedServerDetails}
            />

            {error && currentStatus === ConnectionStatus.ERROR && (
              <p className="text-center text-red-400 bg-red-900/50 p-3 rounded-md animate-pulse">{error}</p>
            )}

            <ServerSelector
              servers={MOCK_SERVERS}
              selectedServer={selectedServer}
              onChange={handleServerChange}
              disabled={currentStatus === ConnectionStatus.CONNECTING || currentStatus === ConnectionStatus.DISCONNECTING}
            />

            <ConnectButton
              status={currentStatus}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              disabled={isButtonDisabled}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;