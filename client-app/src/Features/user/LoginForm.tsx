import React, { useContext } from 'react'
import {Form as FinalForm, Field} from 'react-final-form'; 
import { Form, Button, Segment, Header } from 'semantic-ui-react';
import TextInput from '../../App/common/form/TextInput';
import { RootStoreContext } from '../../App/stores/rootStore';
import { IUserFormValues } from '../../App/Models/User';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../App/common/form/ErrorMessage';

const validate = combineValidators( {
    email: isRequired("email"),
    password: isRequired("password")
})

const LoginForm = () => {

    const root = useContext(RootStoreContext);
    const {login} = root.userStore;

    return (
           <FinalForm onSubmit={(values : IUserFormValues) => login(values).catch(error => ({
               [FORM_ERROR] : error
           }))}
           validate={validate}
           render={({handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
               <Segment>
                    <Form onSubmit={handleSubmit} error>
                        <Header as='h2' content="Login to Reactivities" color="teal" textAlign='center'/>
                        <Field name="email" component={TextInput} placeholder="email@email.com"/>
                        <Field name="password" type="password" component={TextInput} placeholder="password"/>
                        {submitError && !dirtySinceLastSubmit && 
                            <ErrorMessage error={submitError} text='Invalid email or password'/>
                        }
                        <Button loading={submitting} disabled={invalid && !dirtySinceLastSubmit || pristine} color='teal' content="Login" fluid />
                    </Form>
               </Segment>
            )}
        />

    )
}

export default LoginForm
