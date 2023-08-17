import { LocalStorageTypes } from '../../models';
import { Stock } from '../..//models/stock';
import { getLocalStorage, setLocalStorage } from '../..//utilities';
import {  createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction, } from '@reduxjs/toolkit';

const storedFavorites = getLocalStorage(LocalStorageTypes.FAVORITES);
const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites as string) : [];
const initialState: Stock[] = Array.isArray(parsedFavorites) ? parsedFavorites : [];

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Stock>) => {
      const newState = [...state, action.payload];
      setLocalStorage(LocalStorageTypes.FAVORITES, JSON.stringify(newState));
      return newState;
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const filteredState = current(state).filter((stock: Stock) => stock.symbol !== action.payload);
      setLocalStorage(LocalStorageTypes.FAVORITES, JSON.stringify(filteredState));
      return filteredState;
    }
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;