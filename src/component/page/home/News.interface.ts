import { NewsModel } from 'service/type/model/news';

export interface NewsPropsType {
  news: NewsModel;
  index: number;
  dataTestId: string;
}
