import React, {useEffect, Fragment, useContext} from 'react';
import './styles.css';
import {Container} from 'semantic-ui-react'
import NavBar from '../../Features/Nav/NavBar';
import ActivityDashboard  from '../../Features/activities/dashboard/ActivityDashboard';
import ActivityStore from '../stores/activityStore';
import {LoadingComponent} from './LoadingComponent';
import {observer} from 'mobx-react-lite'
import {v4 as uuid} from 'uuid'
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { HomePage } from '../../Features/home/HomePage';
import ActivityForm from '../../Features/activities/form/ActivityForm';
import ActivityDetails from '../../Features/activities/details/ActivityDetails';

const Activities : React.FC<RouteComponentProps> = ({location}) => {
    
    const activityStore = useContext(ActivityStore)

    useEffect(() => {;
       activityStore.loadActivities();   
    }, [activityStore]); 

    if(activityStore.loadingInitial) return <LoadingComponent content='Loading selected activity...'/>

    return (
        <Fragment>
            <NavBar />
            <Container>
                <Route exact path='/' component={HomePage}/>
                <Route exact path='/activities' component={ActivityDashboard}/>
                <Route path='/activities/:id' component={ActivityDetails}/>          
                {/* This bit of code seems to literally do nothing, odd as the one above is fully functional */}
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
            </Container>
        </Fragment>
    )
}

export default withRouter(observer(Activities));