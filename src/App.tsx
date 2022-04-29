import React, { createContext } from "react";
import { auth } from "my-firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ConfigedRoutes from "routes";

const App = () => {
  const [user] = useAuthState(auth);
  const Context = createContext<unknown>(null);

  return (
    <Context.Provider value={{ auth, user }}>
      <ConfigedRoutes />
    </Context.Provider>
  );
};

export default App;
