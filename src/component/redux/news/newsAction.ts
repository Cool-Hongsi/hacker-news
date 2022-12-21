import { NEWS_ACTION } from 'service/const/action';
import { NewsModel } from 'service/type/model/news';
import { CommentModel } from 'service/type/model/comment';
import {
  TopNewsRequestAction,
  TopNewsSuccessAction,
  TopNewsFailureAction,
  NewsDetailSuccessAction,
  NewsDetailFailureAction,
  CommentsRequestAction,
  CommentsSuccessAction,
  CommentsFailureAction,
} from 'component/redux/news/newsAction.interface';

const {
  TOP_NEWS_REQUEST,
  TOP_NEWS_SUCCESS,
  TOP_NEWS_FAILURE,
  NEWS_DETAIL_SUCCESS,
  NEWS_DETAIL_FAILURE,
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAILURE,
} = NEWS_ACTION;

export const topNewsRequest = (): TopNewsRequestAction => ({
  type: TOP_NEWS_REQUEST,
});

export const topNewsSuccess = (dataFromServer: number[]): TopNewsSuccessAction => ({
  type: TOP_NEWS_SUCCESS,
  payload: dataFromServer,
});

export const topNewsFailure = (dataFromServer: Error): TopNewsFailureAction => ({
  type: TOP_NEWS_FAILURE,
  payload: dataFromServer,
});

export const newsDetailSuccess = (dataFromServer: NewsModel[]): NewsDetailSuccessAction => ({
  type: NEWS_DETAIL_SUCCESS,
  payload: dataFromServer,
});

export const newsDetailFailure = (dataFromServer: Error): NewsDetailFailureAction => ({
  type: NEWS_DETAIL_FAILURE,
  payload: dataFromServer,
});

export const commentsRequest = (id: number, kids: number[]): CommentsRequestAction => ({
  type: COMMENTS_REQUEST,
  payload: { id, kids },
});

export const commentsSuccess = (matchedNewsIndex: number, dataFromServer: CommentModel[]): CommentsSuccessAction => ({
  type: COMMENTS_SUCCESS,
  payload: { matchedNewsIndex, dataFromServer },
});

export const commentsFailure = (dataFromServer: Error): CommentsFailureAction => ({
  type: COMMENTS_FAILURE,
  payload: dataFromServer,
});
