import React, {useState, useEffect, Fragment, SyntheticEvent} from 'react';
import './styles.css';
import IActivitiesObject from '../Models/IActivitiesObject';
import {Container} from 'semantic-ui-react'
import NavBar from '../../Features/Nav/NavBar';
import { ActivityDashboard } from '../../Features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';

const Activities = () => {
    
    const [activities, setActivities] = useState<IActivitiesObject[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivitiesObject | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget] = useState('');

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    }

    const handleSelectActivity = (id: string) => {
        if(id === "") {
            setSelectedActivity(null);
            return;
        }

        setSelectedActivity(
            activities.filter(x => x.id === id)[0]
        );
        setEditMode(false);
    }

    const handleCreateActivity = (activity : IActivitiesObject) => {
        setSubmitting(true);
        agent.Activities.create(activity)
        .then(() => {
            setActivities([...activities, activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        }, rejected => {
            console.log("Rejected because: ", rejected);
        }).then(x => setSubmitting(false))
        

    }

    const handleEditActivity = (activity : IActivitiesObject) => {
        setSubmitting(true);
        agent.Activities.update(activity)
        .then(() => {
            setActivities([...activities.filter(a => a.id !== activity.id), activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        }, rejected => {
            console.log("Rejected because: ", rejected);
        }).then(x => setSubmitting(false));
        
    }

    const handleDeleteActivity = (event : SyntheticEvent<HTMLButtonElement> ,id: string) => {
        setSubmitting(true);
        setTarget(event.currentTarget.name);
        agent.Activities.delete(id)
        .then(() => {
            setActivities([...activities.filter(a => a.id !== id)]);
        }, rejected => {
            console.log("Rejected because: ", rejected);
        }).then(x => setSubmitting(false))
    }

    useEffect(() => {
        agent.Activities.list()
        .then((response) => {
            let activities : IActivitiesObject[] = [];
            response.forEach(activity => {
                activity.date = activity.date.split('.')[0];
                activities.push(activity);
            });
            setActivities(activities);
        }).then(() => setLoading(false));
    }, []); //empty array ensures that it is only run once

    if(loading) return <LoadingComponent content='Loading activities...'/>

    return (
        <Fragment>
            <Container>
            <ActivityDashboard 
                activities = {activities} 
                selectActivity={handleSelectActivity}
                selectedActivity={selectedActivity!}
                editMode = {editMode}
                setEditMode = {setEditMode}
                createActivity = {handleCreateActivity}
                editActivity = {handleEditActivity}
                deleteActivity = {handleDeleteActivity}
                submitting = {submitting}
                target = {target}
                />
            </Container>
            <NavBar openCreateForm={handleOpenCreateForm}/>
        </Fragment>
    )
}

export default Activities;