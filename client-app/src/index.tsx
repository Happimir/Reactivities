import React from 'react';
import ReactDOM from 'react-dom';
import './App/Layout/styles.css';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
  import Activities from './App/Layout/Activities';
  import ValuesComponent from './Components/ValuesComponent';
import { Menu, Image } from 'semantic-ui-react';
import { HomePage } from './Features/home/HomePage';

const routing = (
    <BrowserRouter>
        <Menu fixed='top' inverted>
            <Menu.Item header as={NavLink} exact to ="/">
                    <Image src="/assets/logo.png" alt="logo" size="mini">
                    </Image>  
            </Menu.Item>
            <Menu.Item name="Activities" as={NavLink} to="/activities">
                Activities
            </Menu.Item>
            <Menu.Item name="Values" as={NavLink} to="/values">
                Values
            </Menu.Item>
        </Menu>
        <Route exact path="/" component={HomePage}/>
        <Route path="/values" component={ValuesComponent}/>
        <Route path="/activities" component={Activities}/>
  </BrowserRouter>
);


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
