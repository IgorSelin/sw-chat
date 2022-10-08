import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as Pages from 'pages';
import Paths from 'constants/path';
import { onMessageListener } from 'my-firebase';

export const config = [
  {
    exact: true,
    path: Paths.HOME,
    element: <Pages.MainPage />
  },
  {
    exact: true,
    path: Paths.PERSON_DETAILS,
    element: <Pages.PersonDetails />
  },
  {
    exact: true,
    path: Paths.MAIN_CHAT,
    element: <Pages.ChatPage />
  },
  {
    exact: true,
    path: Paths.USERS,
    element: <Pages.AllUsers />
  },
  {
    exact: true,
    path: Paths.SELECTED_CHAT,
    element: <Pages.ChatPage />
  },
  {
    exact: true,
    path: Paths.LOGIN,
    element: <Pages.Login />
  }
];

export const getRouteConfig = (value: string) => {
  const route = config.find(({ path }) => path === value)!;
  const { element, ...rest } = route;
  return rest.path;
};

const ConfigedRoutes = () => {
  onMessageListener()
    .then((payload: any) => console.log(payload))
    .catch(err => console.log('failed: ', err));

  return (
    <BrowserRouter>
      <Routes>
        {config.map((item, index) => (
          <Route key={index} {...item} />
        ))}
        <Route path='*' element={<Pages.NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ConfigedRoutes;
