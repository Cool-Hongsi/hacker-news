import { CommentModel } from 'service/type/model/comment';
import { CommentResponse } from 'service/type/response/comment';

export const mockComment1: CommentModel[] = [
  {
    id: 1,
    by: 'testComment1',
  },
  {
    id: 2,
    by: 'testComment2',
  },
];

export const mockComment2: CommentModel[] = [
  {
    id: 3,
    by: 'testComment3',
  },
  {
    id: 4,
    by: 'testComment4',
  },
];

export const mockCommentResponse: CommentResponse = {
  by: 'testCommentResponse',
  id: 1,
  kids: [1, 2, 3],
  parent: 10,
  text: 'testCommentText',
  time: 1,
  type: 'testType',
};
