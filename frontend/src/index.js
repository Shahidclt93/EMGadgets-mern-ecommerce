import React from 'react';
import {createRoot} from "react-dom/client";
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 




const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <ToastContainer
      position="bottom-center"
      autoClose={5000} 
      hideProgressBar={false} 
    />
    <App />
  </Provider>
);


