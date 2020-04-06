import React, { useContext, useEffect, useState } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import activityStore from '../../../App/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { useParams, RouteComponentProps, Redirect } from 'react-router-dom'
import { LoadingComponent } from '../../../App/Layout/LoadingComponent'

interface DetailParams {
  id: string;
}

const ActivityDetails : React.FC<RouteComponentProps<DetailParams>> = ({match}) => {

    const store = useContext(activityStore);
    const {activity, selectActivity, loadActivity, loadingInitial} = store;
    const [moveAway, setMoveAway] = useState(false);

    useEffect(() => {
      loadActivity(match.params.id)
    }, [loadActivity])

    if(loadingInitial || !activity) {
      return <LoadingComponent content='Loading selected activity...'/>
    }

    if(moveAway) {
      return <Redirect to='/activities'/>
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
              <Button basic onClick={() => selectActivity(activity!.id, true)} color='blue' content='Edit'/>
              <Button basic onClick={() => setMoveAway(true)} color='grey' content='Cancel'/>
          </Button.Group>
        </Card.Content>
      </Card>
    )
}

export default observer(ActivityDetails);
