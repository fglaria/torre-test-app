import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchByID from './routes/SearchByID';
import SearchUsers from './routes/SearchUsers';
import SearchJobs from './routes/SearchJobs';

const Home = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Main />
      </div>
    </Router>
  );
}

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Torre Test App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Search ID</Nav.Link>
            <Nav.Link href="/users">Search Users</Nav.Link>
            <Nav.Link href="/jobs">Search Jobs</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const Main = () => {
  return (
    <Switch>
      <Route exact path="/">
        <SearchByID />
      </Route>
      <Route path="/users">
        <SearchUsers />
      </Route>
      <Route path="/jobs">
        <SearchJobs />
      </Route>
    </Switch>
  );
}

export default Home;
