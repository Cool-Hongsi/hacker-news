import { AnyAction } from 'redux';
import { NEWS_ACTION } from 'service/const/action';
import { CommentModel } from 'service/type/model/comment';
import { NewsModel } from 'service/type/model/news';

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

export interface TopNewsRequestAction {
  type: typeof TOP_NEWS_REQUEST;
  payload?: null;
}

export interface TopNewsSuccessAction {
  type: typeof TOP_NEWS_SUCCESS;
  payload: number[];
}

export interface TopNewsFailureAction {
  type: typeof TOP_NEWS_FAILURE;
  payload: Error;
}

// Don't need NEWS_DETAIL_REQUEST because we are going to call news detail api right away once top news api call is successful

export interface NewsDetailSuccessAction {
  type: typeof NEWS_DETAIL_SUCCESS;
  payload: NewsModel[];
}

export interface NewsDetailFailureAction {
  type: typeof NEWS_DETAIL_FAILURE;
  payload: Error;
}

export interface CommentsRequestAction {
  type: typeof COMMENTS_REQUEST;
  payload: {
    id: number;
    kids: number[];
  };
}

export interface CommentsSuccessAction {
  type: typeof COMMENTS_SUCCESS;
  payload: {
    matchedNewsIndex: number;
    dataFromServer: CommentModel[];
  };
}

export interface CommentsFailureAction {
  type: typeof COMMENTS_FAILURE;
  payload: Error;
}

export type NewsActionTypes =
  | AnyAction
  | TopNewsRequestAction
  | TopNewsSuccessAction
  | TopNewsFailureAction
  | NewsDetailSuccessAction
  | NewsDetailFailureAction
  | CommentsRequestAction
  | CommentsSuccessAction
  | CommentsFailureAction;
