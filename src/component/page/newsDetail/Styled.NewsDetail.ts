import styled from 'styled-components';
import { colorStyle, fontStyle, getResponsiveMediaQuery } from 'Styled.GlobalStyle';

export const NewsDetail = styled.div`
  display: flex;
  justify-content: center;

  .news-detail-container {
    border-radius: 10px;
    box-shadow: 0 0 8px ${colorStyle.grey};
    padding: 35px;
    width: calc(100vw * 0.6);

    ${getResponsiveMediaQuery('md')} {
      width: calc(100vw * 0.8);
    }

    ${getResponsiveMediaQuery('sm')} {
      width: 100vw;
      padding: 40px 30px;
    }

    .news-title {
      font-size: ${fontStyle.size.xl};
      font-family: ${fontStyle.family.latoB};
      margin: 40px 0;
      line-height: 55px;

      ${getResponsiveMediaQuery('sm')} {
        font-size: ${fontStyle.size.lg};
        line-height: 40px;
      }
    }
    .news-comment-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 35px;

      ${getResponsiveMediaQuery('sm')} {
        display: block;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-bottom: 0px;
      }

      .news-total-comment {
        font-size: ${fontStyle.size.md};
        font-weight: bold;
      }

      .news-view-comment-container {
        display: flex;
        align-items: center;

        ${getResponsiveMediaQuery('sm')} {
          flex-direction: column-reverse;
          margin: 20px 0;
        }
        .space {
          margin: 0 7px;

          ${getResponsiveMediaQuery('sm')} {
            margin: 7px 0;
          }
        }
      }
    }
  }
`;
