import React, { useContext, useEffect } from 'react'
import activityStore from '../../../App/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'
import { LoadingComponent } from '../../../App/Layout/LoadingComponent'
import { Grid } from 'semantic-ui-react'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedSideBar from './ActivityDetailedSideBar'

interface DetailParams {
  id: string;
}

const ActivityDetails : React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

    const store = useContext(activityStore);
    const {activity, loadActivity, loadingInitial} = store;

    useEffect(() => {
      loadActivity(match.params.id)
    }, [loadActivity, match.params.id])

    console.log("My activity is: ", activity);
    if(loadingInitial || !activity) {
      return <LoadingComponent content='Loading selected activity...'/>
    }

    return (
        <Grid>
          <Grid.Column width={10}>
            <ActivityDetailedHeader activity = {activity} />
            <ActivityDetailedInfo activity = {activity} />
            <ActivityDetailedChat />
          </Grid.Column>
          <Grid.Column width={6}>
            <ActivityDetailedSideBar />
          </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails);
