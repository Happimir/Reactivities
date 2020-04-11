import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import './App/Layout/styles.css';
import {createBrowserHistory} from 'history';
import * as serviceWorker from './serviceWorker';
import {
    Router
  } from "react-router-dom";
import ScrollToTop from './App/Layout/ScrollToTop';
import Activities from './App/Layout/Activities';
import { ToastContainer } from 'react-toastify';


export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ToastContainer position='bottom-right'>
      
    </ToastContainer>
    <ScrollToTop>
      <Activities />
    </ScrollToTop>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
