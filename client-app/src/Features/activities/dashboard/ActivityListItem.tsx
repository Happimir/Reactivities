import React from 'react'
import { observer } from 'mobx-react-lite'
import { Item, Button, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import IActivitiesObject from '../../../App/Models/IActivitiesObject'
import {format} from 'date-fns';

interface IProps {
    activity : IActivitiesObject
}

const ActivityListItem : React.FC<IProps> = ({activity}) => {


    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Description>
                                Hosted by Michael
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>   
            </Segment>
            <Segment>
                <Icon name='clock'/> {format(activity.date, "h:mm a")}
                <Icon name='marker' color='green'/> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go here
            </Segment>
            <Segment clearing>
                <span>{activity.description} </span>
                <Button as={Link} to={`/activities/${activity!.id}`} floated="right" color="blue" content="View" />
            </Segment>
        </Segment.Group>
        
    )
}

export default observer(ActivityListItem)