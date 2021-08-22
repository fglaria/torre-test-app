import React, { useState } from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';

import * as QueryService from '../services/queryService';

const useMergingState = initialState => {
  const [state, _setState] = useState(initialState);

  const setState = newState => _setState(oldState => ({
    ...oldState,
    ...newState,
  }));

  return [state, setState];
};

const Main = () => {

  const [query, setQuery] = useMergingState({
    text: '',
    type: 'users',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    QueryService.send(query);
  };

  return (
    <div class="text-center">
      <h2 class="mt-3">Torre Test App</h2>
      <Container class="mt-2" fluid>
        <Form onSubmit={ onSubmit }>
          <Row>
            <Col>
              <Form.Control lg={10} type="text" placeholder="Search here..." 
                onChange={({ target: { value } }) => setQuery({ text: value })}/>
            </Col>
            <Col>
            <Form.Select 
              onChange={({ target: { value } }) => setQuery({ type: value })}>
              <option value="users">Users</option>
              <option value="jobs">Jobs</option>
            </Form.Select>
            </Col>
            <Col>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default Main;
