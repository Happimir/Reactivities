import React, {useEffect, useContext} from 'react';
import { Grid } from 'semantic-ui-react';
import  ActivityList  from './ActivityList';
import {observer} from 'mobx-react-lite';
import { LoadingComponent } from '../../../App/Layout/LoadingComponent';
import { RootStoreContext } from '../../../App/stores/rootStore';

const ActivityDashboard : React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const {loadActivities, loadingInitial} = rootStore.activityStore;

    useEffect(() => {;
        loadActivities();   
     }, [loadActivities]); 
 
     if(loadingInitial) return <LoadingComponent content='Loading selected activity...'/>

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList ></ActivityList>
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Activity Filters to be added</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);
