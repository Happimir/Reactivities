import React from 'react';
import ReactDOM from 'react-dom';
import './App/Layout/styles.css';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter
  } from "react-router-dom";
  import Activities from './App/Layout/Activities';
import ScrollToTop from './App/Layout/ScrollToTop';


ReactDOM.render(
<BrowserRouter>
  <ScrollToTop>
    <Activities />
  </ScrollToTop> 
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
