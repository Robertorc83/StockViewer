import { renderHook } from '@testing-library/react-hooks';
import { useFetch } from './useFetch';
import { vi, expect, it } from 'vitest';

// Mock the global fetch function
global.fetch = vi.fn();

describe('useFetch hook', () => {

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should show loading state initially', () => {
    const { result } = renderHook(() => useFetch('https://api.example.com/data'));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('sets data on successful fetch', async () => {
    const mockData = { key: 'value' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });

    const { result, waitForNextUpdate } = renderHook(() => useFetch('https://api.example.com/data'));
    
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('sets error on failed fetch', async () => {
    const mockError = new Error('Failed to fetch');
    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useFetch('https://api.example.com/data'));
    
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toEqual(mockError);
  });
  
});