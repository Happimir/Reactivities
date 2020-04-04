import React, { SyntheticEvent } from 'react'
import { Grid } from 'semantic-ui-react'
import IActivitiesObject from '../../../App/Models/IActivitiesObject'
import { ActivityList } from './ActivityList'
import { ActivityDetails } from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'

interface IProps {
    activities: IActivitiesObject[];
    selectActivity : (id : string) => void;
    selectedActivity : IActivitiesObject;
    editMode : boolean;
    setEditMode : (editMode: boolean) => void;
    createActivity : (activity : IActivitiesObject) => void;
    editActivity : (activity : IActivitiesObject) => void;
    deleteActivity : (event: SyntheticEvent<HTMLButtonElement>, id : string) => void;
    submitting : boolean,
    target : string
}

export const ActivityDashboard : React.FC<IProps> = ({activities, selectActivity, selectedActivity, editMode, 
    setEditMode, createActivity, editActivity, deleteActivity, submitting, target}) => {

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList target = {target} submitting = {submitting} activities = {activities} selectActivity={selectActivity} setEditMode={setEditMode} deleteActivity={deleteActivity}></ActivityList>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && <ActivityDetails  selectActivity={selectActivity} activity = {selectedActivity} setEditMode={setEditMode}/>}
                {editMode && <ActivityForm key={selectedActivity && selectedActivity.id || 0} submitting = {submitting}  setEditMode={setEditMode} activity={selectedActivity} createActivity={createActivity} editActivity={editActivity}/>}
            </Grid.Column>
        </Grid>
    )
}
