import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import {v4 as uuid} from 'uuid'
import { RouteComponentProps } from 'react-router';
import { ActivityFormValues } from '../../../App/Models/IActivitiesObject';
import { Form as FinalForm, Field} from 'react-final-form';
import TextInput from '../../../App/common/form/TextInput';
import TextAreaInput from '../../../App/common/form/TextAreaInput';
import SelectInput from '../../../App/common/form/SelectInput';
import { category } from '../../../App/common/options/CategoryOptions';
import DateInput from '../../../App/common/form/DateInput';
import { combineDatesAndTime } from '../../../App/common/util/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import { RootStoreContext } from '../../../App/stores/rootStore';

const validate = combineValidators({
  title: isRequired({message: 'Title is Required'}),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({message: "needs to be at least 5 chracters"})
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
})

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {createActivity, editActivity,  submitting,loadActivity,} = rootStore.activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id).then(
        (activity) => setActivity(new ActivityFormValues(activity))
      ).finally(() => setLoading(false));
    }
  }, [
    loadActivity,
    match.params.id,
  ]);

  const handleFinalFormSubmit = (values : any) => {
    const dateAndTime = combineDatesAndTime(values.date, values.time);
    const {date, time, ...activity} = values; //omit date, and time from values. But keep the rest in what activity has
    activity.date = dateAndTime; //then set the activity.date to be the new date and time
    
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }

  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm onSubmit={handleFinalFormSubmit}
            initialValues={activity}
            validate={validate}
            render={({handleSubmit, invalid, pristine}) => (
            <Form onSubmit={handleSubmit} loading={loading}>
            <Field
              name='title'
              placeholder='Title'
              value={activity.title}
              component={TextInput}
            />
            <Field
              name='description'
              placeholder='Description'
              rows={3}
              value={activity.description}
              component={TextAreaInput}
            />
            <Field
              name='category'
              placeholder='Category'
              value={activity.category}
              options={category}
              component={SelectInput}
            />
            <Form.Group widths='equal'>
              <Field
                component={DateInput}
                name='date'
                placeholder='01/01/2020'
                date={true}
                value={activity.date}
              />
              <Field
                component={DateInput}
                name='time'
                placeholder='1:00:00 PM'
                time={true}
                value={activity.time}
              />
            </Form.Group>

            <Field
              name='city'
              placeholder='City'
              value={activity.city}
              component={TextInput}
            />
            <Field
              name='venue'
              placeholder='Venue'
              value={activity.venue}
              component={TextInput}
            />
            <Button
              disabled={loading || invalid || pristine}
              loading={submitting}
              floated='right'
              positive
              type='submit'
              content='Submit'
            />
            <Button
              disabled={loading}
              onClick={activity.id ? () => 
                history.push(`/activities/${activity.id}`) : () => history.push('/activities')}
              floated='right'
              type='button'
              content='Cancel'
            />
          </Form>
          )}/>
          
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);