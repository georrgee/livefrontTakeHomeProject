import { renderHook, act } from '@testing-library/react-native';
import { useNetworkStatus } from '../useNetworkStatus';

/** @description Test suite for the useNetworkStatus hook */
describe('useNetworkStatus', () => {
  it('should return connected status', () => {
    const { result } = renderHook(() => useNetworkStatus());
    
    expect(result.current.isConnected).toBe(true);
    expect(result.current.isInternetReachable).toBe(true);
  });

  it('should return with a status of false when network error is set', () => {
    const { result } = renderHook(() => useNetworkStatus());
    
    act(() => {
      result.current.setNetworkError(true);
    });
    
    expect(result.current.isConnected).toBe(false);
    expect(result.current.isInternetReachable).toBe(false);
  });

  it('should return with a status of true when network error is cleared', () => {
    const { result } = renderHook(() => useNetworkStatus());
    
    act(() => {
      result.current.setNetworkError(true);
    });
    
    expect(result.current.isConnected).toBe(false);
    
    act(() => {
      result.current.setNetworkError(false);
    });
    
    expect(result.current.isConnected).toBe(true);
    expect(result.current.isInternetReachable).toBe(true);
  });
});