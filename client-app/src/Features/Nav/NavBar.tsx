import React from 'react';
import {Menu, Container, Button, Image} from 'semantic-ui-react'

interface IProps {
    openCreateForm: () => void;
}

const NavBar :React.FC<IProps> = ({openCreateForm}) => {

    return (
        <Menu fixed='bottom' inverted>
            <Menu.Item name='Activities'/>
            <Menu.Item>
                <Button positive content="Create" onClick={openCreateForm}></Button>
            </Menu.Item>      
        </Menu>
      )
}

export default NavBar;

