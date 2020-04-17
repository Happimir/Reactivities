import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'
import { LoadingComponent } from '../../../App/Layout/LoadingComponent'
import { Grid } from 'semantic-ui-react'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedSideBar from './ActivityDetailedSideBar'
import { RootStoreContext } from '../../../App/stores/rootStore'

interface DetailParams {
  id: string;
}

const ActivityDetails : React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

    const rootStore = useContext(RootStoreContext);
    const {activity, loadActivity, loadingInitial} = rootStore.activityStore;
    
    useEffect(() => {
      loadActivity(match.params.id)
    }, [loadActivity, match.params.id, history])

    if(loadingInitial) {
      return <LoadingComponent content='Loading selected activity...'/>
    }

    if(!activity) {    
      return <h2>Not Found</h2>
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
