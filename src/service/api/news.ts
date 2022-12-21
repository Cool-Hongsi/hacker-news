import { AxiosResponse } from 'axios';
import { axiosGetApi } from 'service/api/axios';
import { CommentModel, parsingCommentResponseToCommentModel } from 'service/type/model/comment';
import { NewsModel, parsingNewsResponseToNewsModel } from 'service/type/model/news';

export interface CustomApiResponse {
  statusCode: number;
  data: number[] | NewsModel[] | CommentModel[] | Error;
}

export const topNewsRequestApi = async (): Promise<CustomApiResponse> => {
  try {
    const result: CustomApiResponse = await axiosGetApi({
      endPoint: `topstories.json?print=pretty`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          return {
            statusCode: response.status,
            data: response.data.splice(0, 30), // Only store top 30 news ID
          };
        } else {
          throw new Error('Error while processing topNewsRequestApi');
        }
      })
      .catch((err) => {
        throw err;
      });
    return result;
  } catch (err) {
    return {
      statusCode: 400,
      data: err as Error,
    };
  }
};

export const newsDetailRequestApi = async (topNews: number[]): Promise<CustomApiResponse> => {
  try {
    // [ ========== Bad waterfall ========== ]
    // const tasks = [];
    // for (let i = 0; i < topNews.length; i++) {
    //   tasks.push(
    //     await axiosGetApi({
    //       endPoint: `item/${topNews[i]}.json?print=pretty`,
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     })
    //       .then((response: AxiosResponse) => {
    //         if (response.status === 200) {
    //           return response.data;
    //         } else {
    //           throw new Error('Error while processing newsDetailRequestApi');
    //         }
    //       })
    //       .catch((err) => {
    //         throw err;
    //       }),
    //   );
    // }
    // return {
    //   statusCode: 200,
    //   data: parsingNewsResponseToNewsModel(tasks), // parsing (response => model)
    // };

    // [ ========== Good waterfall ========== ]
    const tasks = [];
    for (let i = 0; i < topNews.length; i++) {
      tasks.push(
        axiosGetApi({
          endPoint: `item/${topNews[i]}.json?print=pretty`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response: AxiosResponse) => {
            if (response.status === 200) {
              return response.data;
            } else {
              throw new Error('Error while processing newsDetailRequestApi');
            }
          })
          .catch((err) => {
            throw err;
          }),
      );
    }
    const tasksFulfilled = await Promise.all(tasks);
    return {
      statusCode: 200,
      data: parsingNewsResponseToNewsModel(tasksFulfilled), // parsing (response => model)
    };
  } catch (err) {
    return {
      statusCode: 400,
      data: err as Error,
    };
  }
};

export const commentsRequestApi = async (kids: number[]): Promise<CustomApiResponse> => {
  // Only store top 10 commenter's name
  const kidsLength = kids.length > 10 ? 10 : kids.length;
  try {
    const tasks = [];
    for (let i = 0; i < kidsLength; i++) {
      tasks.push(
        axiosGetApi({
          endPoint: `item/${kids[i]}.json?print=pretty`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response: AxiosResponse) => {
            if (response.status === 200) {
              return response.data;
            } else {
              throw new Error('Error while processing commentsRequestApi');
            }
          })
          .catch((err) => {
            throw err;
          }),
      );
    }
    const tasksFulfilled = await Promise.all(tasks);
    return {
      statusCode: 200,
      data: parsingCommentResponseToCommentModel(tasksFulfilled), // parsing (response => model)
    };
  } catch (err) {
    return {
      statusCode: 400,
      data: err as Error,
    };
  }
};
