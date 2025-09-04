import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '@/layout';
import Error from '@/layout/error';

const FeedbackPage = lazy(() => import('@/pages/feedback'));
const MigrationPage = lazy(() => import('@/pages/migration'));
const MigrationConfirmPage = lazy(() => import('@/pages/migration/confirm'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: 'feedback',
        element: <FeedbackPage />,
      },
      {
        path: 'migration',
        element: <MigrationPage />,
      },
      {
        path: 'migration/confirm',
        element: <MigrationConfirmPage />,
      },
    ],
  },
]);

export default function Main() {
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
}
