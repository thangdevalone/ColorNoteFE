import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './app/store';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider autoHideDuration={2500} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
