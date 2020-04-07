import React, {useState, useEffect, Fragment, useContext} from 'react'
import { Item, Button, Label, Segment, Search } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import activityStore from '../../../App/stores/activityStore';
import { Link} from 'react-router-dom';


const ActivityList : React.FC = () => {

    const[search, updateSearch] = useState<string>("");
    
    const store = useContext(activityStore);
    const {activitiesByDate, deleteActivity, submitting, target} = store;

    useEffect(() => {
        updateSearch(search);
    }, [search]);

    let myActivities = activitiesByDate.filter((x) => {
        return (x.city.toLowerCase().indexOf(search.toLowerCase()) !== -1 || search === "")
    });

    function handleSearch(event : any) {
        updateSearch(event.target.value.substr(0, 20));
    }

    return (

        <Fragment>
            <Search 
                value={search}
                onSearchChange={handleSearch}
            />
            <Segment clearing>
                <Item.Group divided>
                    {myActivities.map(activity => (
                        <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{new Date(activity.date).toLocaleString()}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/activities/${activity.id}`} floated="right" color="blue" content="View" />
                                <Button name={activity.id} onClick={(e) => deleteActivity(e, activity.id)} loading={target === activity.id && submitting} floated="right" negative content="Delete"/>
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                    
                    ))}    
                </Item.Group>
            </Segment> 
        </Fragment>
    )
}

export default observer(ActivityList)
