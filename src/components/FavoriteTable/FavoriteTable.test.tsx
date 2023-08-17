import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FavoriteTable from './FavoriteTable';
import { favoritesSlice } from '../../redux/slices';

// Mock data
const mockFavorites = [
  {
    symbol: 'AAPL',
    open: 150,
    close: 155,
    volume: 100000,
    latestTime: '2023-08-15'
  },
  {
    symbol: 'GOOGL',
    open: 2500,
    close: 2550,
    volume: 50000,
    latestTime: '2023-08-15'
  }
];

// Mock Redux store
const mockStore = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer
  },
  preloadedState: {
    favorites: mockFavorites
  }
});

describe('FavoriteTable component', () => {
  afterEach(() => {
    // Cleanup after each test
  });

  it('renders the FavoriteTable component with the provided data', () => {
    render(
      <Provider store={mockStore}>
        <FavoriteTable />
      </Provider>
    );

    // Check if the tickers from mock data are rendered
    const appleTicker = screen.getByText('AAPL');
    const googleTicker = screen.getByText('GOOGL');
    expect(appleTicker).toBeInTheDocument();
    expect(googleTicker).toBeInTheDocument();

  });


  it('removes a favorite when delete icon is clicked', async () => {
  render(
    <Provider store={mockStore}>
      <FavoriteTable />
    </Provider>
  );

  // Click the delete icon for the AAPL ticker
  const deleteIcons = screen.getAllByRole('button', { name: /favorites/i });
  userEvent.click(deleteIcons[0]);

  await waitFor(() => {
    const appleTicker = screen.queryByText('AAPL');
    expect(appleTicker).not.toBeInTheDocument();
  });
});
});