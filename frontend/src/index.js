import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import {Provider} from "react-redux";
import { Toaster } from 'react-hot-toast';
import { SocketContextProvider } from './context/SocketContext';


const store = configureStore({
  reducer:rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SocketContextProvider>
          <Toaster/>
          <App />
        </SocketContextProvider>
      </BrowserRouter>
    </Provider>  
  </React.StrictMode>
);


reportWebVitals();
