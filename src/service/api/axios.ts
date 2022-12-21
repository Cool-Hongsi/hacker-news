import axios, { AxiosResponse } from 'axios';
import environment from 'environment';

interface AxiosApi {
  endPoint: string;
}

interface AxiosGetApi extends AxiosApi {
  headers: {
    [key: string]: string;
  };
}

// interface AxiosPostApi extends AxiosApi {
//   headers: {
//     [key: string]: string;
//   };
//   body: {
//     [key: string]: string;
//   };
// }

export const axiosGetApi = async ({ endPoint, headers }: AxiosGetApi): Promise<AxiosResponse> =>
  await axios.get(`${environment.baseUrl}${endPoint}`, {
    headers,
  });
