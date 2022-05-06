import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ConfigedRoutes from 'routes';
import store from 'store';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <ConfigedRoutes />
  </Provider>,
  document.getElementById('root')
);
