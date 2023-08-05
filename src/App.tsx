import { ErrorBoundary } from '@sentry/react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { action as emailAuthAction } from './components/Auth/EmailForm';
import SnsAuthRedirect, {
  action as snsAuthAction,
} from './components/Auth/SnsAuthRedirect';
import './css/_reset.css';
import './css/color.css';
import './css/global.css';
import Root from './layout/Root';
import RootContainer from './layout/RootContainer';
import CategoryDetail from './screens/CategoryDetail';
import CategoryGroup from './screens/CategoryGroup';
import Landing from './screens/Landing';
import Playlist from './screens/Playlist';
import Schedule, { action as scheduleAction } from './screens/Schedule';
import Statistics from './screens/Statistics';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootContainer />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/landing',
        element: <Landing />,
        action: emailAuthAction,
      },
      {
        path: '/login/oauth2/code',
        children: [
          {
            path: '/login/oauth2/code/:provider',
            element: <SnsAuthRedirect />,
            action: snsAuthAction,
          },
        ],
      },
      {
        path: '/',
        element: <Root />,
        children: [
          {
            path: '/',
            element: <Navigate to="/playlist" />,
          },
          {
            path: '/playlist',
            index: true,
            element: <Playlist />,
          },
          {
            path: '/schedule',
            element: <Schedule />,
            action: scheduleAction,
          },
          {
            path: '/category',
            element: <CategoryGroup />,
          },
          {
            path: '/category/:id',
            element: <CategoryDetail />,
          },
          {
            path: '/statistics',
            element: <Statistics />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

export default App;
