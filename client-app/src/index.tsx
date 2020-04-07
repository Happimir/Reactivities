import React from 'react';
import ReactDOM from 'react-dom';
import './App/Layout/styles.css';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter
  } from "react-router-dom";
  import Activities from './App/Layout/Activities';


ReactDOM.render(
<BrowserRouter>
    <Activities />
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
