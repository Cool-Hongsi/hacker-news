import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { NewsPropsType } from 'component/page/home/News.interface';
import News from 'component/page/home/News';
import { mockNewsDetail } from 'service/mock/data/news';
import { BrowserRouter as Router } from 'react-router-dom';
import { ROUTE } from 'service/const/route';

const { NEWS } = ROUTE;

const renderComponent = (props: NewsPropsType) =>
  render(
    <Router>
      <News {...props} />
    </Router>,
  );

describe('src/component/page/home/News', () => {
  let props: NewsPropsType;

  beforeEach(() => {
    props = {
      news: mockNewsDetail[0],
      index: 0,
      dataTestId: `news-${mockNewsDetail[0].id}-testid`,
    };
  });

  it('render News component', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId(`news-${mockNewsDetail[0].id}-testid`)).toBeInTheDocument();
  });

  it('test props values', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('news-index-testid')).toHaveTextContent('1');
    expect(getByTestId('news-title-testid')).toHaveTextContent(mockNewsDetail[0].title);
  });

  it('test route', () => {
    const { getByTestId } = renderComponent(props);
    expect(window.location.pathname).toStrictEqual('/');
    fireEvent.click(getByTestId(`news-${mockNewsDetail[0].id}-testid`));
    expect(window.location.pathname).toStrictEqual(`${NEWS}/${mockNewsDetail[0].id}`);
  });
});
