import React from 'react';
import { render } from '@testing-library/react';
import { CommentPropsType } from 'component/page/newsDetail/Comment.interface';
import Comment from 'component/page/newsDetail/Comment';
import { mockComment1 } from 'service/mock/data/comment';
import { BrowserRouter as Router } from 'react-router-dom';

const renderComponent = (props: CommentPropsType) =>
  render(
    <Router>
      <Comment {...props} />
    </Router>,
  );

describe('src/component/page/newsDetail/Comment', () => {
  let props: CommentPropsType;

  beforeEach(() => {
    props = {
      comment: mockComment1[0],
      dataTestId: `comment-${mockComment1[0].id}-testid`,
    };
  });

  it('render Comment component', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId(`comment-${mockComment1[0].id}-testid`)).toBeInTheDocument();
  });

  it('test props values', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId(`comment-${mockComment1[0].id}-testid`)).toHaveTextContent(mockComment1[0].by);
  });
});
