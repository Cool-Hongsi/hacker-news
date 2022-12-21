import React from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createMockStore } from 'service/mock/store/createMockStore';
import App from 'App';

const renderComponent = async (store: Store): Promise<RenderResult> => {
  let renderResult: RenderResult;
  await act(async () => {
    renderResult = render(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>,
    );
  });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return renderResult!;
};

describe('src/App', () => {
  let store: Store;

  beforeEach(() => {
    store = createMockStore({
      newsReducer: {
        topNews: [],
        newsDetail: [],
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders App component', async () => {
    const { getByTestId } = await renderComponent(store); // await render for Suspense Loading in Lazy Load
    expect(getByTestId('app-component-testid')).toBeInTheDocument();
  });
});
