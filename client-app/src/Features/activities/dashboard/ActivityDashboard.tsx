import React, {useEffect, useContext} from 'react';
import { Grid } from 'semantic-ui-react';
import  ActivityList  from './ActivityList';
import {observer} from 'mobx-react-lite';
import activityStore from '../../../App/stores/activityStore';
import { LoadingComponent } from '../../../App/Layout/LoadingComponent';

const ActivityDashboard : React.FC = () => {

    const store = useContext(activityStore);

    useEffect(() => {;
        store.loadActivities();   
     }, [store]); 
 
     if(store.loadingInitial) return <LoadingComponent content='Loading selected activity...'/>

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
