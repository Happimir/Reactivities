import React, {useState, useEffect, Fragment, SyntheticEvent} from 'react'
import { Item, Button, Label, Segment, Search } from 'semantic-ui-react'
import IActivitiesObject from '../../../App/Models/IActivitiesObject'

interface IProps {
    activities: IActivitiesObject[];
    selectActivity : (id : string) => void;
    setEditMode : (editMode: boolean) => void;
    deleteActivity : (event: SyntheticEvent<HTMLButtonElement>, id : string) => void;
    submitting : boolean,
    target : string 
}

export const ActivityList : React.FC<IProps> = ({activities, selectActivity, setEditMode, deleteActivity, submitting, target}) => {

    const[search, updateSearch] = useState<string>("");
    
    useEffect(() => {
        updateSearch(search);
    }, [search]);

    let myActivities = activities.filter((x) => {
        return (x.city.toLowerCase().indexOf(search.toLowerCase()) !== -1 || search == "")
    });

    function handleSearch(event : any) {
        setEditMode(false);
        selectActivity("");
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
                                <Button onClick={() => {selectActivity(activity.id); setEditMode(false)}} floated="right" content="View" color="blue"></Button>
                                <Button name={activity.id} onClick={(e) => {deleteActivity(e, activity.id)}} loading={target === activity.id && submitting} floated="right" negative content="Delete"/>
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
