import { ErrorBoundary } from '@sentry/react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { action as emailAuthAction } from './components/Auth/EmailForm';
import SnsAuthRedirect, {
  action as snsAuthAction,
} from './components/Auth/SnsAuthRedirect';
import { action as todoAction } from './components/Todo/TodoInputOverlay';
import './css/_reset.css';
import './css/color.css';
import './css/global.css';
import Index from './layout/Index';
import RequireAuth, { loader as userLoader } from './layout/RequireAuth';
import Root from './layout/Root';
import CategoryDetail from './screens/CategoryDetail';
import CategoryGroup from './screens/CategoryGroup';
import Landing from './screens/Landing';
import Playlist, { loader as todoLoader } from './screens/Playlist';
import Schedule, {
  action as scheduleAction,
  loader as scheduleLoader,
} from './screens/Schedule';
import Statistics from './screens/Statistics';
import { action as categoryAction } from './components/Category/CategoryInputs/CategoryInputOverlay';
import { QueryClient, QueryClientProvider } from 'react-query';

const today = new Date().toLocaleDateString('sv-SE');
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <Root />
      </RequireAuth>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/landing',
        element: (
          <RequireAuth>
            <Landing />
          </RequireAuth>
        ),
        loader: userLoader,
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
        element: (
          <RequireAuth authRequired={true}>
            <Index />
          </RequireAuth>
        ),
        loader: userLoader,
        children: [
          {
            path: '/',
            element: <Navigate to="/playlist" />,
          },
          {
            path: '/playlist/:today?',
            index: true,
            element: <Playlist />,
            action: todoAction,
            loader: todoLoader,
          },
          {
            path: '/schedule/:today?',
            element: <Schedule />,
            action: scheduleAction,
            loader: scheduleLoader,
          },
          {
            path: '/category',
            element: <CategoryGroup />,
            action: categoryAction,
          },
          {
            path: '/category/:groupId/:categoryId',
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
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
