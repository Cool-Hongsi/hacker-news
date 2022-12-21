/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { NEWS_ACTION } from 'service/const/action';
import { CommentsRequestAction, TopNewsRequestAction } from 'component/redux/news/newsAction.interface';
import {
  topNewsSuccess,
  topNewsFailure,
  newsDetailSuccess,
  newsDetailFailure,
  commentsSuccess,
  commentsFailure,
} from 'component/redux/news/newsAction';
import { commentsRequestApi, CustomApiResponse, newsDetailRequestApi, topNewsRequestApi } from 'service/api/news';
import { NewsModel } from 'service/type/model/news';
import { CommentModel } from 'service/type/model/comment';

const { TOP_NEWS_REQUEST, COMMENTS_REQUEST } = NEWS_ACTION;

// Not necessary (To show loading page with few seconds)
const addDelay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, 1000);
  });
};

export function* topNewsRequestFunc(action?: TopNewsRequestAction): any {
  // Top News Process
  try {
    yield addDelay();

    const topNewsRequestResult: CustomApiResponse = yield call(topNewsRequestApi);

    if (topNewsRequestResult.statusCode === 200) {
      yield put(topNewsSuccess(topNewsRequestResult.data as number[]));
    } else {
      yield put(topNewsFailure(topNewsRequestResult.data as Error));
      return; // If error occured, stop going further process
    }
  } catch (err) {
    yield put(topNewsFailure(err as Error));
  }

  // News Detail Process
  try {
    yield addDelay();

    const reducerSelector = yield select();

    const newsDetailRequestResult: CustomApiResponse = yield call(
      newsDetailRequestApi,
      reducerSelector.newsReducer.topNews,
    );

    if (newsDetailRequestResult.statusCode === 200) {
      yield put(newsDetailSuccess(newsDetailRequestResult.data as NewsModel[]));
    } else {
      yield put(newsDetailFailure(newsDetailRequestResult.data as Error));
    }
  } catch (err) {
    yield put(newsDetailFailure(err as Error));
  }
}

export function* commentsRequestFunc(action: CommentsRequestAction): any {
  // Comments Process
  try {
    yield addDelay();

    let reducerSelector = yield select();

    // Just in case, user clicks refresh in comment page,
    // if refreshed, store data will be initialized.
    // To prevent any of errors, check store newsDetail state length and process above function again (topNewsRequestFunc())
    if (!reducerSelector.newsReducer.newsDetail.length) {
      yield topNewsRequestFunc();
      reducerSelector = yield select();
      // used select() twice
      // is because select() allows us to access store state and get different state data depending on declaration position.
    }

    const matchedNewsIndex = reducerSelector.newsReducer.newsDetail.findIndex(
      (news: NewsModel) => news.id === action.payload.id,
    );

    const commentsRequestResult: CustomApiResponse = yield call(commentsRequestApi, action.payload.kids);

    if (commentsRequestResult.statusCode === 200) {
      yield put(commentsSuccess(matchedNewsIndex, commentsRequestResult.data as CommentModel[]));
    } else {
      yield put(commentsFailure(commentsRequestResult.data as Error));
    }
  } catch (err) {
    yield put(commentsFailure(err as Error));
  }
}

export function* newsSagaWatcher() {
  yield takeLatest(TOP_NEWS_REQUEST, topNewsRequestFunc);
  yield takeLatest(COMMENTS_REQUEST, commentsRequestFunc);
}
