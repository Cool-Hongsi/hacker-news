import produce from 'immer';
import { Reducer } from 'redux';
import { NEWS_ACTION } from 'service/const/action';
import { NewsState } from 'component/redux/news/newsReducer.interface';
import { NewsActionTypes } from 'component/redux/news/newsAction.interface';

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

const INITIAL_STATE: NewsState = {
  loading: false,
  error: null,
  topNews: [], // News ID List
  newsDetail: [], // News Detail List (Including Comments)
};

const newsReducer: Reducer<NewsState, NewsActionTypes> = (
  state = INITIAL_STATE,
  action: NewsActionTypes,
): NewsState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case TOP_NEWS_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.topNews = [];
        break;
      case TOP_NEWS_SUCCESS:
        // draft.loading = false; // keep loading UI for news detail API
        draft.error = null;
        draft.topNews = action.payload;
        break;
      case TOP_NEWS_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        draft.topNews = [];
        break;
      case NEWS_DETAIL_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.newsDetail = action.payload;
        break;
      case NEWS_DETAIL_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        draft.newsDetail = [];
        break;
      case COMMENTS_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case COMMENTS_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.newsDetail[action.payload.matchedNewsIndex].comments = action.payload.dataFromServer;
        break;
      case COMMENTS_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
      default:
        return state;
    }
  });
};

export default newsReducer;
