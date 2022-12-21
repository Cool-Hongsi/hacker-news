import { NewsResponse } from 'service/type/response/news';
import { CommentModel } from 'service/type/model/comment';

export interface NewsModel {
  id: number;
  descendants: number;
  kids: number[];
  title: string;
  comments: CommentModel[];
}

export const parsingNewsResponseToNewsModel = (newsResponse: NewsResponse[]): NewsModel[] => {
  try {
    return newsResponse.map((news: NewsResponse) => {
      return {
        id: news.id ?? 0,
        descendants: news.descendants ?? 0,
        kids: news.kids ?? [],
        title: news.title ?? 'No Title',
        comments: [], // for future use
      };
    });
  } catch {
    return [];
  }
};
