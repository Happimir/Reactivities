import React, { useContext, Fragment } from 'react'
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { RootStoreContext } from '../../App/stores/rootStore'
import LoginForm from '../user/LoginForm'
import RegisterForm from '../user/RegisterForm'

export const HomePage = () => {

    const root = useContext(RootStoreContext);
    const {isLoggedIn, user} = root.userStore;
    const {openModal} = root.modalStore;

    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    Reactivities
                </Header>
                {isLoggedIn && user ? (
                    <Fragment>
                        <Header as='h2' inverted content={`Welcome Back, ${user.displayName}`} />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities!
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Header as='h2' inverted content='Welcome to Reactivities' />
                        <Button onClick={() => openModal(<LoginForm/>)} to='/login' size='huge' inverted>
                            Login
                        </Button>
                        <Button onClick={() => openModal(<RegisterForm/>)} to='/register' size='huge' inverted>
                            Register
                        </Button>
                    </Fragment>
                )}  
            </Container>
        </Segment>
    )
}
