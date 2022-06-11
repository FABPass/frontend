import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NotificationProvider from "./components/Notifications/NotificationProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <NotificationProvider>
        <App />
    </NotificationProvider>
);


reportWebVitals();
