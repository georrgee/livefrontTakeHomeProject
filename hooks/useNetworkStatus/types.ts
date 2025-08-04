/**
 * @param { boolean } isConnected Boolean value to see if the device is connected to the network
 * @param { boolean } isInternetReachable Boolean value to see if the device is connected to the internet
 * @description Interface for the network status atom component
 */

export interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean;
}