import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import NewsDetail from 'component/page/newsDetail/NewsDetail';
import { Store } from '@reduxjs/toolkit';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Provider } from 'react-redux';
import { commentsRequest } from 'component/redux/news/newsAction';
import { BrowserRouter as Router } from 'react-router-dom';
import { mockNewsDetail } from 'service/mock/data/news';
import { NewsModel } from 'service/type/model/news';
import { CustomApiResponse, commentsRequestApi } from 'service/api/news';
import { CommentModel, parsingCommentResponseToCommentModel } from 'service/type/model/comment';
import { mockCommentResponse } from 'service/mock/data/comment';

// Mocking Action (To prevent real execution)
jest.mock('component/redux/news/newsAction', () => ({
  commentsRequest: jest.fn(),
}));

// Mocking API response with axios
jest.mock('axios', () => ({
  get: (url: string) => {
    if (url.includes('item')) {
      return Promise.resolve({ status: 200, data: mockCommentResponse });
    }
    return Promise.reject(new Error('API Test error occured (get)'));
  },
}));

// Mocking Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ state: mockNewsDetail[0] }),
}));

const renderComponent = (store: Store) =>
  render(
    <Router>
      <Provider store={store}>
        <NewsDetail />
      </Provider>
    </Router>,
  );

describe('src/component/page/newsDetail/NewsDetail', () => {
  let store: Store;

  describe('test loading state', () => {
    it('when loading state is true, render LoadingSpinner component', () => {
      store = createMockStore({
        newsReducer: {
          loading: true,
          topNews: [],
          newsDetail: mockNewsDetail,
        },
      });
      store.dispatch = jest.fn();
      const { getByTestId } = renderComponent(store);
      expect(getByTestId('loadingSpinner-component-testid')).toBeInTheDocument();
    });
  });

  describe('test error state', () => {
    it('when error state is not null, render Error component', () => {
      store = createMockStore({
        newsReducer: {
          error: new Error('Test Error'),
          topNews: [],
          newsDetail: mockNewsDetail,
        },
      });
      store.dispatch = jest.fn();
      const { getByTestId } = renderComponent(store);
      expect(getByTestId('error-component-testid')).toBeInTheDocument();
    });
  });

  beforeEach(() => {
    store = createMockStore({
      newsReducer: {
        loading: false,
        topNews: [],
        newsDetail: mockNewsDetail,
      },
    });
    store.dispatch = jest.fn();
  });

  it('render NewsDetail component', () => {
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('newsDetail-component-testid')).toBeInTheDocument();
    expect(getByTestId('news-title-testid')).toHaveTextContent(mockNewsDetail[0].title);
    expect(getByTestId('news-totalComment-testid')).toHaveTextContent(mockNewsDetail[0].descendants.toString());
  });

  it('test calling dispatch (commentsRequest)', () => {
    const { getByTestId } = renderComponent(store);
    fireEvent.click(getByTestId('viewComment-button-testid'));
    expect(commentsRequest).toHaveBeenCalled();
    expect(commentsRequest).toHaveBeenCalledWith(mockNewsDetail[0].id, mockNewsDetail[0].kids);
  });

  it('render Comment component', () => {
    const { getByTestId } = renderComponent(store);
    const newsDetailIndex = mockNewsDetail.findIndex((detail: NewsModel) => detail.id === mockNewsDetail[0].id);
    mockNewsDetail[newsDetailIndex].comments.forEach((comment: CommentModel) => {
      expect(getByTestId(`comment-${comment.id}-testid`)).toBeInTheDocument();
    });
  });

  describe('test API', () => {
    it('test commentsRequestApi API', async () => {
      const expectedResult: CustomApiResponse = {
        statusCode: 200,
        data: parsingCommentResponseToCommentModel([mockCommentResponse]),
      };
      const result: CustomApiResponse = await commentsRequestApi([1]);
      expect(result).toStrictEqual(expectedResult);
    });
  });
});
