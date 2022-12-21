import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTE } from 'service/const/route';
import BodyContainer from 'component/page/BodyContainer';
import LoadingSpinner from 'component/common/loadingSpinner/LoadingSpinner';
import * as Styled from 'Styled.App';

const { HOME, NEWS } = ROUTE;

const Home = React.lazy(() => import('component/page/home/Home'));
const News = React.lazy(() => import('component/page/newsDetail/NewsDetail'));

const App = () => {
  return (
    <Styled.App data-testid="app-component-testid">
      <BodyContainer>
        <Suspense
          fallback={
            <div className="loadingSpinner-component">
              <LoadingSpinner dataTestId="loadingSpinner-component-testid" text="Loading Component" />
            </div>
          }
        >
          <Routes>
            <Route path={HOME} element={<Home />}></Route>
            <Route path={NEWS + '/:id'} element={<News />}></Route>
          </Routes>
        </Suspense>
      </BodyContainer>
    </Styled.App>
  );
};

export default App;
