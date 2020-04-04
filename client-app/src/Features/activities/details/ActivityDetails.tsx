import React from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import IActivitiesObject from '../../../App/Models/IActivitiesObject'

interface IProps {
    activity: IActivitiesObject;
    setEditMode : (editMode : boolean) => void;
    selectActivity : (id : string) => void;
}

export const ActivityDetails : React.FC<IProps> = ({activity, setEditMode, selectActivity}) => {
    return (
        <Card fluid>
        <Image src={`/assets/categoryImages/${activity?.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span>{new Date(activity.date).toLocaleString()}</span>
          </Card.Meta>
          <Card.Description>
            {activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
              <Button basic onClick={() => setEditMode(true)} color='blue' content='Edit'/>
              <Button basic onClick={() => {selectActivity("")}} color='grey' content='Cancel'/>
          </Button.Group>
        </Card.Content>
      </Card>
    )
}
