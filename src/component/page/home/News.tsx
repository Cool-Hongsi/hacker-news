import React from 'react';
import { Link } from 'react-router-dom';
import { NewsPropsType } from 'component/page/home/News.interface';
import { ROUTE } from 'service/const/route';
import * as Styled from 'component/page/home/Styled.News';

const { NEWS } = ROUTE;

const News = ({ news, index, dataTestId }: NewsPropsType) => {
  return (
    <Link to={NEWS + `/${news.id}`} data-testid={dataTestId} state={news}>
      <Styled.News>
        <div className="news-index" data-testid="news-index-testid">
          {index + 1}
        </div>
        <div className="news-title" data-testid="news-title-testid">
          {news.title}
        </div>
      </Styled.News>
    </Link>
  );
};

export default News;
