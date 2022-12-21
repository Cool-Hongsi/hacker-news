import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NewsModel } from 'service/type/model/news';
import { useAppDispatch } from 'service/hook/useAppDispatch';
import useAppSelector from 'service/hook/useAppSelector';
import { commentsRequest } from 'component/redux/news/newsAction';
import LoadingSpinner from 'component/common/loadingSpinner/LoadingSpinner';
import ErrorPage from 'component/page/error/ErrorPage';
import { CommentModel } from 'service/type/model/comment';
import Comment from 'component/page/newsDetail/Comment';
import Button from 'component/common/button/Button';
import * as Styled from 'component/page/newsDetail/Styled.NewsDetail';

const NewsDetail = () => {
  const { loading, error, newsDetail } = useAppSelector((state) => state.newsReducer);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const news = useLocation().state as NewsModel;

  const onClickGoBack = () => {
    navigate(-1);
  };

  /**
   * @param id number / news id (news is from route state)
   * @param kids number[] / news kids (news is from route state)
   *
   * * if kids.length === 0 => just show warning alert and do not go further process
   * * if kids.length > 0 => dispatch commentsRequest with id, kids for calling comment API
   */
  const onClickViewComments = (id: number, kids: number[]) => {
    if (!kids.length) {
      alert('There is no comment');
      return;
    }
    dispatch(commentsRequest(id, kids));
  };

  if (error) {
    return <ErrorPage dataTestId="error-component-testid" error={error} />;
  }

  // In order to find out the index that matched newDetail with news route state
  // Because the comment data is stored in newDetail state
  const newsDetailIndex = newsDetail.findIndex((detail: NewsModel) => detail.id === news.id);

  return (
    <Styled.NewsDetail data-testid="newsDetail-component-testid">
      <div className="news-detail-container">
        <Button
          dataTestId="goBack-button-testid"
          text="Go Back"
          onClickFunc={onClickGoBack}
          width="100px"
          height="45px"
        />
        <div className="news-title" data-testid="news-title-testid">
          {news.title}
        </div>
        <div className="news-comment-container">
          <div className="news-total-comment" data-testid="news-totalComment-testid">
            Total Comments: {news.descendants}
          </div>
          <div className="news-view-comment-container">
            {loading && <LoadingSpinner width="35px" height="35px" dataTestId="loadingSpinner-component-testid" />}
            <span className="space"></span>
            <Button
              dataTestId="viewComment-button-testid"
              text="View Top 10 Commenter Name"
              onClickFunc={() => onClickViewComments(news.id, news.kids)}
              width="240px"
              height="45px"
            />
          </div>
        </div>

        {newsDetailIndex !== -1 && (
          <>
            {newsDetail[newsDetailIndex].comments.map((comment: CommentModel) => {
              return <Comment key={comment.id} comment={comment} dataTestId={`comment-${comment.id}-testid`} />;
            })}
          </>
        )}
      </div>
    </Styled.NewsDetail>
  );
};

export default NewsDetail;
