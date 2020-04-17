import React, {Fragment, useContext, useEffect} from 'react';
import './styles.css';
import {Container} from 'semantic-ui-react'
import NavBar from '../../Features/Nav/NavBar';
import ActivityDashboard  from '../../Features/activities/dashboard/ActivityDashboard';
import {observer} from 'mobx-react-lite'
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { HomePage } from '../../Features/home/HomePage';
import ActivityForm from '../../Features/activities/form/ActivityForm';
import ActivityDetails from '../../Features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import LoginForm from '../../Features/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import { LoadingComponent } from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import RegisterForm from '../../Features/user/RegisterForm';

const Activities : React.FC<RouteComponentProps> = ({location}) => {
    
    const root = useContext(RootStoreContext);
    const {setAppLoaded, token, appLoaded} = root.commonStore;
    const {setUser} = root.userStore;

    useEffect(() => {
        if(token) {
            setUser().finally(() => setAppLoaded())
        } else {
            setAppLoaded();
        }
    }, [setUser, setAppLoaded])

    if(!appLoaded) {
        return <LoadingComponent content="Loading Application..."/>
    }

    return (
        <Fragment>
            <ModalContainer />
            <Route exact path='/' component={HomePage}/>
            <Route path={'/(.+)'} render={() => 
                <Fragment>
                    <NavBar />
                    <Container>
                        <Switch>
                            <Route exact path='/activities' component={ActivityDashboard}/>
                            <Route path='/activities/:id' component={ActivityDetails}/>          
                            <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
                            <Route path='/login' component={LoginForm}/>
                            <Route path='/register' component={RegisterForm}/>
                            <Route component={NotFound}/>
                        </Switch>  
                    </Container>
                </Fragment>
            }/>
        </Fragment>
    )
}

export default withRouter(observer(Activities));