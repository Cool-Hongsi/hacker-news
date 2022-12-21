import { topNewsRequestFunc } from 'component/redux/news/newsSaga';
import newsReducer from 'component/redux/news/newsReducer';
import { NewsState } from 'component/redux/news/newsReducer.interface';
import { TopNewsRequestAction } from 'component/redux/news/newsAction.interface';
import { mockTopNews, mockNewsDetailResponse } from 'service/mock/data/news';
import { NEWS_ACTION } from 'service/const/action';
import { CustomApiResponse } from 'service/api/news';
import { parsingNewsResponseToNewsModel } from 'service/type/model/news';

const { TOP_NEWS_REQUEST } = NEWS_ACTION;

// Mocking API response with axios
jest.mock('axios', () => ({
  get: (url: string) => {
    if (url.includes('topstories')) {
      return Promise.resolve({ status: 200, data: mockTopNews });
    } else if (url.includes('item')) {
      return Promise.resolve({ status: 200, data: mockNewsDetailResponse });
    }
    return Promise.reject(new Error('API Test error occured (get)'));
  },
}));

describe('src/component/redux/news/newsSaga', () => {
  let initialState: NewsState;

  beforeEach(() => {
    initialState = {
      loading: false,
      error: null,
      topNews: [],
      newsDetail: [],
    };
  });

  test('test topNewsRequestFunc (success case)', () => {
    const action: TopNewsRequestAction = {
      type: TOP_NEWS_REQUEST,
    };

    const generator: Generator = topNewsRequestFunc(action);
    generator.next(); // Face addDelay
    generator.next(); // Face topNewsRequestApi call
    const expectedTopNewsRequestApiResult: CustomApiResponse = {
      statusCode: 200,
      data: mockTopNews,
    };
    const topNewsRequestApiResult = generator.next(expectedTopNewsRequestApiResult).value.payload.action;
    // console.log(topNewsRequestApiResult); // { type: 'TOP_NEWS_SUCCESS', payload: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    const newState = newsReducer(initialState, topNewsRequestApiResult);
    expect(newState).toStrictEqual({ ...initialState, topNews: mockTopNews });

    generator.next(); // Face addDelay;
    generator.next(); // Face newsDetailRequestApi call
    const expectedNewsDetailRequestApiResult: CustomApiResponse = {
      statusCode: 200,
      data: parsingNewsResponseToNewsModel([mockNewsDetailResponse]),
    };
    generator.next(expectedNewsDetailRequestApiResult);
    expect(generator.next().done).toBeTruthy(); // No more yield
  });

  test('test topNewsRequestFunc (failure case)', () => {
    const action: TopNewsRequestAction = {
      type: TOP_NEWS_REQUEST,
    };

    const generator: Generator = topNewsRequestFunc(action);
    generator.next(); // Face addDelay
    generator.next(); // Face topNewsRequestApi call
    const topNewsRequestApiError = new Error('Error occured while processing topNewsRequestApi');

    const expectedTopNewsRequestApiResult: CustomApiResponse = {
      statusCode: 400,
      data: topNewsRequestApiError,
    };
    const topNewsRequestApiResult = generator.next(expectedTopNewsRequestApiResult).value.payload.action;
    // console.log(topNewsRequestApiResult); // { type: 'TOP_NEWS_FAILURE', payload: Error: Error occured while processing topNewsRequestFunc }
    const newState = newsReducer(initialState, topNewsRequestApiResult);
    expect(newState).toStrictEqual({ ...initialState, error: topNewsRequestApiError });
    expect(generator.next().done).toBeTruthy(); // No more yield (if failed to call API, face return)
  });
});
