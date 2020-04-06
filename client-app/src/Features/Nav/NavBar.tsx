import React, { useContext, Fragment } from 'react';
import {Menu, Button} from 'semantic-ui-react'
import activityStore from '../../App/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { Switch, Route, Link } from 'react-router-dom';
import ActivityForm from '../activities/form/ActivityForm';

const NavBar = () => {

    const store = useContext(activityStore);
    const {openCreateForm} = store;

    return (
        <Fragment>
            <Menu fixed='bottom' inverted>
            <Menu.Item>
                <Button positive>
                    <Link to="/create">Create</Link>
                </Button>
            </Menu.Item>      
            </Menu>
        </Fragment>
      )
}

export default observer(NavBar);

