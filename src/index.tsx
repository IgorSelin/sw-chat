import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store";
import ConfigedRoutes from "routes";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <ConfigedRoutes />
  </Provider>,
  document.getElementById("root")
);
