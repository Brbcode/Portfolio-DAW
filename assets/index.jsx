import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoadRoute from './js/Routes/LoadRoute/LoadRoute';

const App = React.lazy(() => import('./js/App'));
// React.lazy(()=> import('./js/App'));
const RouteExample = React.lazy(() => import('./js/Routes/RouteExample')
  .then((module) => new Promise((resolve) => {
    setTimeout(() => resolve(module), 5000);
  })));
// React.lazy(()=> import('./js/Routes/RouteExample'));
const FatalError = React.lazy(() => import('./js/Routes/FatalError/FatalError'));
const NotFound = React.lazy(() => import('./js/Components/NotFound/NotFound'));
const Home = React.lazy(() => import('./js/Routes/Home'));
const Projects = React.lazy(() => import('./js/Routes/Projects/Projects'));
const ChatBrb = React.lazy(() => import('./js/Routes/Projects/ChatBRB/ChatBrb'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <FatalError />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'chatbrb',
        element: <ChatBrb />,
      },
      {
        path: 'route2',
        element: <RouteExample routeID={2} />,
      },
      // Not found fallback
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<LoadRoute />}>
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>,
);
