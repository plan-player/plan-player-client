import { ErrorBoundary } from '@sentry/react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from './layout/Nav';
import Root from './layout/Root';
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
            element: <Navigate to="/playlist" />
          },
          {
            path: '/playlist',
            index: true,
            element: <Playlist />,
          },
          {
            path: '/player',
            element: <Player />,
          },
          {
            path: '/schedule',
            element: <Schedule />,
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
  return <RouterProvider router={router} />;
};

export default App;
