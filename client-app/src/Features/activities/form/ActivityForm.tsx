import React, {useState, FormEvent, useContext} from 'react'
import { Segment, Form, Button, Container } from 'semantic-ui-react'
import IActivitiesObject from '../../../App/Models/IActivitiesObject'
import {v4 as uuid} from 'uuid'
import activityStore from '../../../App/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { Redirect } from 'react-router-dom'

const ActivityForm : React.FC = () => {

    console.log("in activity");
    const [moveAway, setMoveAway] = useState(false);
    const store = useContext(activityStore);
    const {activity : initialformState, createActivity, editActivity, submitting, selectActivity} = store;
    const initializeForm = () => {
        if(initialformState) {
            return initialformState;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date : '',
                city : '',
                venue: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivitiesObject>(initializeForm);

    const handleSubmit = () => {
        
        if(activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };

            createActivity(newActivity)
            .then(() => {
                setMoveAway(true);
            });
            
        } else {
            editActivity(activity)
            .then(() => {
                setMoveAway(true);
            });
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget; 
        setActivity({...activity, [name] : value});
    }

    if(moveAway) {
        return <Redirect to='/activities'/>
    }
    
    return (
        <Container>
            <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder = "Title" name="title" value={activity.title} onChange={handleInputChange}/>
                <Form.TextArea placeholder = "Description" name="description" rows={2} value={activity.description} onChange={handleInputChange}/>
                <Form.Input placeholder = "Category" name="category" value={activity.category} onChange={handleInputChange}/>
                <Form.Input placeholder = "Date" name="date" type="datetime-local" value={activity.date} onChange={handleInputChange}/>
                <Form.Input placeholder = "City" name="city" value={activity.city} onChange={handleInputChange}/>
                <Form.Input placeholder = "Venue" name="venue" value={activity.venue} onChange={handleInputChange}/>
                
                <Button floated='right' loading={submitting} positive type='submit' content='Submit'/>
                <Button floated='left' type="button" name="cancel" content='Cancel' onClick={() => setMoveAway(true)}/>
            </Form>
            </Segment>  
        </Container>
            
    )
}

export default observer(ActivityForm);