import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import newsReducer from 'component/redux/news/newsReducer';
import { newsSagaWatcher } from 'component/redux/news/newsSaga';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    newsSagaWatcher(),
    // Other sagas...
  ]);
}

export const createStore = () =>
  configureStore({
    reducer: {
      newsReducer,
      // Other reducers...
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
  });

export const store = createStore();

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
