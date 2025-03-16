import { lazy } from 'react';
import { RouteObject } from 'react-router';

// Ленивая загрузка страниц (если нужно)
const HomePage = lazy(() => import('pages/Home/Home'));
const ItemPage = lazy(() => import('pages/ItemPage/ItemPage'));
const NotFoundPage = lazy(() => import('pages/NotFound/NotFound'));

type AppRoute = RouteObject & {
  path: string;
  element: React.ReactNode;
};

export const routesPaths = {
  home: '/',
  coin: '/coin/:coinId',
};

const routes: AppRoute[] = [
  { path: routesPaths.home, element: <HomePage /> },
  { path: routesPaths.coin, element: <ItemPage /> },
  { path: '*', element: <NotFoundPage /> },
];

export default routes;
