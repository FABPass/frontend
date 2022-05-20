import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {AuthProvider} from "./context/AuthProvider";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
      <Provider store={store}>
          <App />
      </Provider>
  </AuthProvider>
);


reportWebVitals();
