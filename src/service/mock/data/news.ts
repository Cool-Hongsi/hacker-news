import { NewsModel } from 'service/type/model/news';
import { mockComment1, mockComment2 } from 'service/mock/data/comment';
import { NewsResponse } from 'service/type/response/news';

export const mockTopNews: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const mockNewsDetail: NewsModel[] = [
  {
    id: 1,
    descendants: 10,
    kids: [1, 2, 3],
    title: 'testNews1',
    comments: mockComment1,
  },
  {
    id: 2,
    descendants: 20,
    kids: [4, 5, 6],
    title: 'testNews2',
    comments: mockComment2,
  },
];

export const mockNewsDetailResponse: NewsResponse = {
  by: 'testNewsResponse',
  descendants: 10,
  id: 1,
  kids: [1, 2, 3],
  score: 1,
  time: 1,
  title: 'testNewsResponseTitle',
  type: 'testType',
  url: 'testUrl',
};
