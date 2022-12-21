import { createStore } from 'service/store';
import { Store } from '@reduxjs/toolkit';
import { NewsState } from 'component/redux/news/newsReducer.interface';
import { mockNewsDetail, mockTopNews } from 'service/mock/data/news';
import { mockComment1 } from 'service/mock/data/comment';
import {
  topNewsRequest,
  topNewsSuccess,
  topNewsFailure,
  newsDetailSuccess,
  newsDetailFailure,
  commentsRequest,
  commentsSuccess,
  commentsFailure,
} from 'component/redux/news/newsAction';

jest.mock('axios', () => ({}));

describe('src/component/redux/news/newsReducer', () => {
  const store: Store = createStore();
  const initialState: NewsState = {
    loading: false,
    error: null,
    topNews: [],
    newsDetail: [],
  };

  describe('topNews', () => {
    it('test topNewsRequest action', () => {
      store.dispatch(topNewsRequest());
      expect(store.getState().newsReducer).toEqual({
        ...initialState,
        loading: true,
        error: null,
        topNews: [],
      });
    });
    it('test topNewsFailure action', () => {
      const errorPayload = new Error('Error in topNews');
      store.dispatch(topNewsFailure(errorPayload));
      expect(store.getState().newsReducer).toEqual({
        ...initialState,
        loading: false,
        error: errorPayload,
        topNews: [],
      });
    });
    it('test topNewsSuccess action', () => {
      store.dispatch(topNewsSuccess(mockTopNews));
      expect(store.getState().newsReducer).toEqual({
        ...initialState,
        error: null,
        topNews: mockTopNews,
      });
    });
  });

  describe('newsDetail', () => {
    it('test newsDetailFailure action', () => {
      const errorPayload = new Error('Error in newsDetail');
      store.dispatch(newsDetailFailure(errorPayload));
      expect(store.getState().newsReducer).toEqual({
        ...initialState,
        loading: false,
        error: errorPayload,
        topNews: mockTopNews,
        newsDetail: [],
      });
    });
    it('test newsDetailSuccess action', () => {
      store.dispatch(newsDetailSuccess(mockNewsDetail));
      expect(store.getState().newsReducer).toEqual({
        ...initialState,
        loading: false,
        error: null,
        topNews: mockTopNews,
        newsDetail: mockNewsDetail,
      });
    });
  });

  describe('comment', () => {
    it('test commentsRequest action', () => {
      store.dispatch(commentsRequest(mockNewsDetail[0].id, mockNewsDetail[0].kids));
      expect(store.getState().newsReducer).toEqual({
        ...initialState,
        loading: true,
        error: null,
        topNews: mockTopNews,
        newsDetail: mockNewsDetail,
      });
    });
    it('test commentsFailure action', () => {
      const errorPayload = new Error('Error in comment');
      store.dispatch(commentsFailure(errorPayload));
      expect(store.getState().newsReducer).toEqual({
        ...initialState,
        loading: false,
        error: errorPayload,
        topNews: mockTopNews,
        newsDetail: mockNewsDetail,
      });
    });
    it('test commentsSuccess action', () => {
      store.dispatch(commentsSuccess(0, mockComment1));
      expect(store.getState().newsReducer).toEqual({
        ...initialState,
        loading: false,
        error: null,
        topNews: mockTopNews,
        newsDetail: mockNewsDetail,
      });
    });
  });
});
