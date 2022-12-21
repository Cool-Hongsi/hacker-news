import React from 'react';
import { CommentPropsType } from 'component/page/newsDetail/Comment.interface';
import * as Styled from 'component/page/newsDetail/Styled.Comment';

const Comment = ({ comment, dataTestId }: CommentPropsType) => {
  return <Styled.Comment data-testid={dataTestId}>{comment.by}</Styled.Comment>;
};

export default Comment;
