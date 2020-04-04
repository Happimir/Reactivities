import React, {useState, FormEvent} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import IActivitiesObject from '../../../App/Models/IActivitiesObject'
import {v4 as uuid} from 'uuid'

interface IProps {
    setEditMode : (editMode: boolean) => void;
    activity: IActivitiesObject;
    createActivity : (activity : IActivitiesObject) => void;
    editActivity : (activity : IActivitiesObject) => void;
    submitting : boolean;
}

export const ActivityForm :React.FC<IProps> = ({setEditMode, activity : initialformState, createActivity, editActivity, submitting}) => {

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

            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget; 
        setActivity({...activity, [name] : value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder = "Title" name="title" value={activity.title} onChange={handleInputChange}/>
                <Form.TextArea placeholder = "Description" name="description" rows={2} value={activity.description} onChange={handleInputChange}/>
                <Form.Input placeholder = "Category" name="category" value={activity.category} onChange={handleInputChange}/>
                <Form.Input placeholder = "Date" name="date" type="datetime-local" value={activity.date} onChange={handleInputChange}/>
                <Form.Input placeholder = "City" name="city" value={activity.city} onChange={handleInputChange}/>
                <Form.Input placeholder = "Venue" name="venue" value={activity.venue} onChange={handleInputChange}/>
                
                <Button floated='right' loading={submitting} positive type='submit' content='Submit'/>
                <Button floated='left' type='submit' content='Cancel' onClick={() => setEditMode(false)}/>
            </Form>
        </Segment>
    )
}
