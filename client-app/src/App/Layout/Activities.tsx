import React, {useEffect, Fragment, useContext} from 'react';
import './styles.css';
import {Container} from 'semantic-ui-react'
import NavBar from '../../Features/Nav/NavBar';
import ActivityDashboard  from '../../Features/activities/dashboard/ActivityDashboard';
import ActivityStore from '../stores/activityStore';
import {LoadingComponent} from './LoadingComponent';
import {observer} from 'mobx-react-lite'
import {v4 as uuid} from 'uuid'
import { Route } from 'react-router-dom';
import { HomePage } from '../../Features/home/HomePage';
import ActivityForm from '../../Features/activities/form/ActivityForm';
import ActivityDetails from '../../Features/activities/details/ActivityDetails';

const Activities = () => {
    
    const activityStore = useContext(ActivityStore)

    useEffect(() => {;
       activityStore.loadActivities();   
    }, [activityStore]); 

    if(activityStore.loadingInitial) return <LoadingComponent content='Loading selected activity...'/>

    return (
        <Fragment key={uuid()}>
            <Container>
                <Route exact path='/' component={HomePage}/>
                <Route exact path='/activities' component={ActivityDashboard}/>
                <Route path='/activities/:id' component={ActivityDetails}/>          
                <Route path='/create' component={ActivityForm}/>
            </Container>
            <NavBar />
        </Fragment>
    )
}

export default observer(Activities);