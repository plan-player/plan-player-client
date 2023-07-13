import { ErrorBoundary } from '@sentry/react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './css/reset.css';
import './css/color.css';
import './css/global.css';
import Nav from './layout/Nav';
import Root from './layout/Root';
import CategoryDetail from './screens/CategoryDetail';
import CategoryGroup from './screens/CategoryGroup';
import Landing from './screens/Landing';
import Player from './screens/Player';
import Playlist from './screens/Playlist';
import Schedule from './screens/Schedule';
import Statistics from './screens/Statistics';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/landing',
        element: <Landing />,
      },
      {
        path: '/',
        element: <Nav />,
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
          {
            path: '/player',
            element: <Player />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
