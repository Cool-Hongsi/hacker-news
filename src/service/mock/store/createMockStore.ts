import configureStore from 'redux-mock-store';
import { Store } from '@reduxjs/toolkit';
import { RootState } from 'service/store';

// only for testing
export const createMockStore = (mockState: Partial<RootState>): Store => {
  const mockStore = configureStore([]);
  const store = mockStore(mockState);
  return store;
};
