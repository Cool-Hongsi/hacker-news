# Hacker News

## Description

This application represents Top 30 news with top commenter's name through [Hacker News API](https://github.com/HackerNews/API) created by React and Typescript. It is including how to handle data process efficiently and organize structure.

### # Directory

- asset -> fonts and images
- component
  - common -> component that can be reusable
  - page -> component that creates UI
  - redux -> state management
- service
  - api -> API handling with axios
  - const -> constant string (action / route)
  - hook -> useSelector, useDispatch
  - mock -> mock data for testing (News / Comment / MockStore)
  - store -> store definition
  - type -> type definition for model and API response
- [ All of testing codes are placed under each directory with `__test__` ]

### # Process

- When open the application successfully, it will show loading page in order to call Top 30 News ID API and matched News detail API (Here, I added delay on purpose to represent loading page (addDelay function in saga)).
- Click one of news, redirect to News detail page and it will represent count of total comments.
- Once you click view all comments button, this will execute calling comment API.
- Along with redux and saga, handles state management (action, dispatch) and processing API call
- API response will be parsed as necessary information in this application based on model

## To run application

1. git clone `https://github.com/Cool-Hongsi/hacker-news.git`
2. Create `.env` file in root directory and add below code

```
REACT_APP_DEV_API=https://hacker-news.firebaseio.com/v0/
REACT_APP_QA_API=QA_API_ADDRESS
REACT_APP_PROD_API=PROD_API_ADDRESS
```

3. Type `npm install` in terminal in order to install necessary packages
4. Type `npm run dev` to execute application
5. Type `npm run test` to test

## Model

#### # News Model

```
export interface NewsModel {
  id: number;
  descendants: number;
  kids: number[];
  title: string;
  comments: CommentModel[];
}
```

#### # Comment Model

```
export interface CommentModel {
  id: number;
  by: string;
}
```

## Responsive Standard

- sm (width <= 768)
- md (769 <= width <= 1200)
- lg (1201 <= width)

## State Management

- Redux with Saga

## UI

- Styled Component

## Testing

- Jest, Testing-Library
