import React, {useState, useEffect, Fragment, useContext} from 'react'
import { Item,  Label } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import activityStore from '../../../App/stores/activityStore';
import ActivityListItem from './ActivityListItem';


const ActivityList : React.FC = () => {

    const[search, updateSearch] = useState<string>("");
    
    const store = useContext(activityStore);
    const {activitiesByDate} = store;

    useEffect(() => {
        updateSearch(search);
    }, [search]);

    // let myActivities = activitiesByDate.filter((x) => {
    //     return (x.city.toLowerCase().indexOf(search.toLowerCase()) !== -1 || search === "")
    // });

    // function handleSearch(event : any) {
    //     updateSearch(event.target.value.substr(0, 20));
    // }

    return (

        <Fragment>
            {/*
            think of a way of making this work again 
            <Search 
                value={search}
                onSearchChange={handleSearch}
            /> */}
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label  size='large' color='blue'>
                        {group}
                    </Label>
                    <Item.Group divided>
                        {activities.map(activity => (   
                            <ActivityListItem key={activity.id} activity={activity}/>
                        ))}    
                    </Item.Group>
                </Fragment>
                
            ))}
            
            
        </Fragment>
    )
}

export default observer(ActivityList)
