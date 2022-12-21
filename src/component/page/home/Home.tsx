import React, { useEffect } from 'react';
import { useAppDispatch } from 'service/hook/useAppDispatch';
import useAppSelector from 'service/hook/useAppSelector';
import { topNewsRequest } from 'component/redux/news/newsAction';
import LoadingSpinner from 'component/common/loadingSpinner/LoadingSpinner';
import ErrorPage from 'component/page/error/ErrorPage';
import { NewsModel } from 'service/type/model/news';
import News from 'component/page/home/News';
import * as Styled from 'component/page/home/Styled.Home';

const Home = () => {
  const { loading, error, topNews, newsDetail } = useAppSelector((state) => state.newsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!topNews.length) {
      // This will call topNews API (get top 30 news ID)
      // If topNews API call is successful, will call newsDetail API right away
      dispatch(topNewsRequest());
    }
  }, [dispatch, topNews.length]);

  if (loading) {
    return (
      <div className="loadingSpinner-component">
        <LoadingSpinner
          dataTestId="loadingSpinner-component-testid"
          text={topNews.length ? 'Loading News Detail' : 'Loading Top 30 News'}
        />
      </div>
    );
  }

  if (error) {
    return <ErrorPage dataTestId="error-component-testid" error={error} />;
  }

  return (
    <Styled.Home data-testid="home-component-testid">
      {newsDetail.map((news: NewsModel, index: number) => {
        return <News key={news.id} news={news} index={index} dataTestId={`news-${news.id}-testid`} />;
      })}
    </Styled.Home>
  );
};

export default Home;
