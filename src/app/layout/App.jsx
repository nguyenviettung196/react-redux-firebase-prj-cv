import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import AccountPage from '../../features/auth/AccountPage';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetaildPage from '../../features/events/eventDetailed/EventDetaildPage';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';
import ProfilePage from '../../features/profiles/profilePage/ProfilePage';
import Sandbox from '../../features/sanbox/Sandbox';
import ErrorComponent from '../common/errors/ErrorComponent';
import ModalManager from '../common/modals/ModalManager';

import './App.css';
import LoadingComponent from './LoadingComponent';

function App() {
  const { key } = useLocation();
  const { initialized } = useSelector(state => state.async);

  if (!initialized) return <LoadingComponent content='Loading app...' />;

  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' theme='colored' hideProgressBar autoClose={3000} />
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            {' '}
            <NavBar />
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route exact path="/sandbox" component={Sandbox} />
              <Route path="/events/:id" component={EventDetaildPage} />
              <Route
                path={['/createEvent', '/manage/:id']}
                component={EventForm}
                key={key}
              />
              <Route exact path='/account' component={AccountPage} />
              <Route path='/profile/:id' component={ProfilePage} />
              <Route path='/error' component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
