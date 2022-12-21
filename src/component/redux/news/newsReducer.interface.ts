import { NewsModel } from 'service/type/model/news';

export interface NewsState {
  loading?: boolean;
  error?: Error | null;
  topNews: number[];
  newsDetail: NewsModel[];
}
