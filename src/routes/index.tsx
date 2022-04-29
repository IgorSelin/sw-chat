import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as Pages from "pages";
export const config = [
  {
    exact: true,
    path: "/",
    isPublic: true,
    element: <Pages.MainPage />,
  },
  {
    exact: true,
    path: "/people/:id",
    isPublic: true,
    element: <Pages.PersonDetails />,
  },
  {
    exact: true,
    path: "/chat",
    isPublic: false,
    element: <Pages.ChatPage />,
  },
  {
    exact: true,
    path: "/login",
    isPublic: true,
    element: <Pages.Login />,
  },
];

export const getRouteConfig = (value: string) => {
  const route = config.find(({ path }) => path === value)!;
  const { element, ...rest } = route;
  return rest.path;
};

export default function ConfigedRoutes() {
  let user = false;
  return (
    <BrowserRouter>
      <Routes>
        {config
          .filter((i) => i.isPublic === !user)
          .map((item, index) => (
            <Route key={index} {...item} />
          ))}
        <Route path="*" element={<Pages.NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
