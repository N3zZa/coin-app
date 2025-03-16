import { lazy } from 'react';
import { RouteObject } from 'react-router';

// Ленивая загрузка страниц (если нужно)
const HomePage = lazy(() => import('pages/Home/Home'));
const FavoritesPage = lazy(() => import('pages/Favorites/Favorites'));
const ItemPage = lazy(() => import('pages/ItemPage/ItemPage'));
const NotFoundPage = lazy(() => import('pages/NotFound/NotFound'));

type AppRoute = RouteObject & {
  path: string;
  element: React.ReactNode;
};

export const routesPaths = {
  home: '/',
  coin: '/coin/',
  fav: '/favorites',
};

const routes: AppRoute[] = [
  { path: routesPaths.home, element: <HomePage /> },
  { path: `${routesPaths.coin}:coinID`, element: <ItemPage /> },
  { path: routesPaths.fav, element: <FavoritesPage /> },
  { path: '*', element: <NotFoundPage /> },
];

export default routes;
