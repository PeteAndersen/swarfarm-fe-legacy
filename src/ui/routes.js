import { Home, News, Bestiary } from './pages';

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/news",
    component: News,
  },
  {
    path: "/bestiary",
    component: Bestiary,
  },
]

export default routes;