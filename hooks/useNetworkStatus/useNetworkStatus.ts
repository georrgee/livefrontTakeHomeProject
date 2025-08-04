import { useState, useCallback } from 'react';
import { NetworkStatus } from './types';

export const useNetworkStatus = (): NetworkStatus & { setNetworkError: (hasError: boolean) => void } => {
  
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: true,
  });

  const setNetworkError = useCallback((hasError: boolean) => {
    setNetworkStatus({
      isConnected: !hasError,
      isInternetReachable: !hasError,
    });
  }, []);

  return {
    ...networkStatus,
    setNetworkError,
  };
};