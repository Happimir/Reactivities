import React, {Fragment} from 'react';
import './styles.css';
import {Container} from 'semantic-ui-react'
import NavBar from '../../Features/Nav/NavBar';
import ActivityDashboard  from '../../Features/activities/dashboard/ActivityDashboard';
import {observer} from 'mobx-react-lite'
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { HomePage } from '../../Features/home/HomePage';
import ActivityForm from '../../Features/activities/form/ActivityForm';
import ActivityDetails from '../../Features/activities/details/ActivityDetails';
import NotFound from './NotFound';

const Activities : React.FC<RouteComponentProps> = ({location}) => {
    
    return (
        <Fragment>
                <Route exact path='/' component={HomePage}/>
                <Route path={'/(.+)'} render={() => 
                    <Fragment>
                        <NavBar />
                        <Container>
                            <Switch>
                                <Route exact path='/activities' component={ActivityDashboard}/>
                                <Route path='/activities/:id' component={ActivityDetails}/>          
                                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
                                <Route component={NotFound}/>
                            </Switch>  
                        </Container>
                    </Fragment>
                }/>
        </Fragment>
    )
}

export default withRouter(observer(Activities));