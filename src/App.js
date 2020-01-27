import React from 'react';
import Container from 'react-bootstrap/Container';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Profile from './profile';
import Dashboard from './dashboard';
import Header from './header';
import { isLoggedIn } from './helpers/check-auth';
import AddTicket from './ticket/add';
import ListTicket from './ticket/list';
import ReplyTicket from './ticket/reply';
import ListUser from './user/list';
import EditUser from './user/edit';

const App = () => {
  return (
    <Container fluid="true">
      <main>
				<Header />

				<Switch>
					<Route exact path="/" render={() => (isLoggedIn() ? <Redirect to="/dashboard" /> : <Redirect to="/login" />)} />
					<Route exact path="/dashboard" render={() => (isLoggedIn() ? <Dashboard /> : <Redirect to="/login" />)} />
					<Route exact path="/login" render={() => (isLoggedIn() ? <Redirect to="/profile" /> : <Login />)} />
					<Route exact path="/profile" render={() => (isLoggedIn() ? <Profile /> : <Redirect to="/login" />)} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/ticket/add" render={() => (isLoggedIn() ? <AddTicket /> : <Redirect to="/login" />)} />
					<Route exact path="/ticket/list" render={() => (isLoggedIn() ? <ListTicket /> : <Redirect to="/login" />)} />
					<Route exact path="/ticket/reply/:id" render={() => (isLoggedIn() ? <ReplyTicket /> : <Redirect to="/login" />)} />
					<Route exact path="/user/list" render={() => (isLoggedIn() ? <ListUser /> : <Redirect to="/login" />)} />
					<Route exact path="/user/edit/:id" render={() => (isLoggedIn() ? <EditUser /> : <Redirect to="/login" />)} />
				</Switch>
			</main>
    </Container>
  );
}

export default App;
