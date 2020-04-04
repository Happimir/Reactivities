import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/Layout/App';
import './App/Layout/styles.css';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Activities from './App/Layout/Activities';
  import ValuesComponent from './Components/ValuesComponent';
import { Menu, Image } from 'semantic-ui-react';

const routing = (
    <BrowserRouter>
        <Menu fixed='top' inverted>
            <Menu.Item header>
                <Link to="/">
                    <Image src="/assets/logo.png" alt="logo" size="mini">
                    </Image>
                </Link>   
            </Menu.Item>
            <Menu.Item name="Activities">
                <Link to="/activities">Activities</Link>
            </Menu.Item>
            <Menu.Item name="Values">
                <Link to="/values">Values</Link>
            </Menu.Item>
        </Menu>
        <Route exact path="/" component={App}/>
        <Route path="/values" component={ValuesComponent}/>
        <Route path="/activities" component={Activities}/>
  </BrowserRouter>
);


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
