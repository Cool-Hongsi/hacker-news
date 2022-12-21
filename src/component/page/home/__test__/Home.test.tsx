import React from 'react';
import { render } from '@testing-library/react';
import Home from 'component/page/home/Home';
import { Store } from '@reduxjs/toolkit';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Provider } from 'react-redux';
import { topNewsRequest } from 'component/redux/news/newsAction';
import { mockNewsDetail, mockNewsDetailResponse, mockTopNews } from 'service/mock/data/news';
import { BrowserRouter as Router } from 'react-router-dom';
import { NewsModel, parsingNewsResponseToNewsModel } from 'service/type/model/news';
import { CustomApiResponse, newsDetailRequestApi, topNewsRequestApi } from 'service/api/news';

// Mocking Action (To prevent real execution)
jest.mock('component/redux/news/newsAction', () => ({
  topNewsRequest: jest.fn(),
}));

// Mocking API response with axios
jest.mock('axios', () => ({
  get: (url: string) => {
    if (url.includes('topstories')) {
      return Promise.resolve({ status: 200, data: mockTopNews });
    } else if (url.includes('item')) {
      return Promise.resolve({ status: 200, data: mockNewsDetailResponse });
    }
    return Promise.reject(new Error('API Test error occured (get)'));
  },
}));

const renderComponent = (store: Store) =>
  render(
    <Router>
      <Provider store={store}>
        <Home />
      </Provider>
    </Router>,
  );

describe('src/component/page/home/Home', () => {
  let store: Store;

  describe('test loading state', () => {
    it('when loading state is false, render Home component', () => {
      store = createMockStore({
        newsReducer: {
          loading: false,
          topNews: [],
          newsDetail: [],
        },
      });
      store.dispatch = jest.fn();
      const { getByTestId } = renderComponent(store);
      expect(getByTestId('home-component-testid')).toBeInTheDocument();
    });
    it('when loading state is true, render Loading component', () => {
      store = createMockStore({
        newsReducer: {
          loading: true,
          topNews: [],
          newsDetail: [],
        },
      });
      store.dispatch = jest.fn();
      const { getByTestId } = renderComponent(store);
      expect(getByTestId('loadingSpinner-component-testid')).toBeInTheDocument();
    });
  });

  describe('test error state', () => {
    it('when error state is null, render Home component', () => {
      store = createMockStore({
        newsReducer: {
          error: null,
          topNews: [],
          newsDetail: [],
        },
      });
      store.dispatch = jest.fn();
      const { getByTestId } = renderComponent(store);
      expect(getByTestId('home-component-testid')).toBeInTheDocument();
    });
    it('when error state is not null, render Error component', () => {
      store = createMockStore({
        newsReducer: {
          error: new Error('Test Error'),
          topNews: [],
          newsDetail: [],
        },
      });
      store.dispatch = jest.fn();
      const { getByTestId } = renderComponent(store);
      expect(getByTestId('error-component-testid')).toBeInTheDocument();
    });
  });

  describe('test topNews state', () => {
    it('when topNews state is empty, call dispatch (topNewsRequest)', () => {
      store = createMockStore({
        newsReducer: {
          topNews: [],
          newsDetail: [],
        },
      });
      store.dispatch = jest.fn();
      renderComponent(store);
      expect(topNewsRequest).toHaveBeenCalled();
    });
    it('when topNews state is not empty, do not call dispatch (topNewsRequest)', () => {
      store = createMockStore({
        newsReducer: {
          topNews: mockTopNews,
          newsDetail: [],
        },
      });
      store.dispatch = jest.fn();
      renderComponent(store);
      expect(topNewsRequest).not.toHaveBeenCalled();
    });
  });

  describe('test newsDetail state', () => {
    it('render News component', () => {
      store = createMockStore({
        newsReducer: {
          topNews: [],
          newsDetail: mockNewsDetail,
        },
      });
      store.dispatch = jest.fn();
      const { getByTestId } = renderComponent(store);
      mockNewsDetail.forEach((news: NewsModel) => {
        expect(getByTestId(`news-${news.id}-testid`)).toBeInTheDocument();
      });
    });
  });

  describe('test API', () => {
    it('test topNewsRequestApi', async () => {
      const expectedResult: CustomApiResponse = {
        statusCode: 200,
        data: JSON.parse(JSON.stringify(mockTopNews)),
      };
      const result: CustomApiResponse = await topNewsRequestApi();
      expect(result).toStrictEqual(expectedResult);
    });
    it('test newsDetailRequestApi', async () => {
      const expectedResult: CustomApiResponse = {
        statusCode: 200,
        data: parsingNewsResponseToNewsModel([mockNewsDetailResponse]),
      };
      const result: CustomApiResponse = await newsDetailRequestApi([1]);
      expect(result).toStrictEqual(expectedResult);
    });
  });
});
