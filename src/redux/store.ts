import { configureStore } from '@reduxjs/toolkit';
import { favoritesSlice } from './slices';
import { Stock } from '../models/stock';

export interface AppStore {
  favorites: Stock[];
}

export default configureStore<AppStore>({
  reducer: {
    favorites: favoritesSlice.reducer
  }
});
