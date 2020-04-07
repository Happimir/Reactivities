import React, { useContext, useEffect, useState } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import activityStore from '../../../App/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { useParams, RouteComponentProps, Redirect, Link } from 'react-router-dom'
import { LoadingComponent } from '../../../App/Layout/LoadingComponent'

interface DetailParams {
  id: string;
}

const ActivityDetails : React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

    const store = useContext(activityStore);
    const {activity, loadActivity, loadingInitial} = store;

    useEffect(() => {
      loadActivity(match.params.id)
    }, [loadActivity])

    console.log("My activity is: ", activity);
    if(loadingInitial || !activity) {
      return <LoadingComponent content='Loading selected activity...'/>
    }

    return (
        <Card fluid>
        <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity!.title}</Card.Header>
          <Card.Meta>
            <span>{new Date(activity!.date).toLocaleString()}</span>
          </Card.Meta>
          <Card.Description>
            {activity!.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
              <Button basic as={Link} to={`/manage/${activity.id}`} color='blue' content='Edit'/>
              <Button basic onClick={() => history.push("/activities")} color='grey' content='Cancel'/>
          </Button.Group>
        </Card.Content>
      </Card>
    )
}

export default observer(ActivityDetails);
