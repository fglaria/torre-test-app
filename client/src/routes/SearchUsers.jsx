import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import BeatLoader from 'react-spinners/BeatLoader';

import * as QueryService from '../services/queryService';
import * as DisplayUsersService from '../services/displayUsersService';


const useMergingState = initialState => {
  const [state, _setState] = useState(initialState);

  const setState = newState => _setState(oldState => ({
    ...oldState,
    ...newState,
  }));

  return [state, setState];
};

const SearchUsers = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [info, setInfo] = useState(false);
  const [error, setError] = useState('');

  const [query, setQuery] = useMergingState({
    size: "10",
    offset: "0",
    aggregate: false,
    type: "post_users"
  });

  const clear = () => {
    setInfo(false);
    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsFetching(true);

    QueryService.send(query)
    .then(q => {
      setIsFetching(false);
      setInfo(q);
    })
    .catch(e => {
      setIsFetching(false);
      setError(e);
    });
  };

  const showInfo = () => {
    if (info)
    {
      return DisplayUsersService.show(info);
    }
  };

  return (
    <div class="text-center">
      <h2 class="mt-3">Search Users</h2>
      <Container class="mt-2" fluid>
        <Form onSubmit={ onSubmit }>
          <Row>
            <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4}>
              <Form.Group as={ Row }>
                <Form.Label column xxl={2} xl={2} lg={2} md={2} sm={2} xs={2} for="size">
                  Size:
                </Form.Label>
                <Col xxl={10} xl={10} lg={10} md={10} sm={10} xs={10}>
                  <Form.Control type="number" name="size" defaultValue="10" min={1}
                    onChange={({ target: { value } }) => {setQuery({ size: value }); clear();}}/>
                </Col>
              </Form.Group>
            </Col>
            <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4}>
              <Form.Group as={ Row }>
                <Form.Label column xxl={2} xl={2} lg={2} md={2} sm={2} xs={2} for="size">
                  Offset:
                </Form.Label>
                <Col xxl={10} xl={10} lg={10} md={10} sm={10} xs={10}>
                  <Form.Control type="number" label="offset" defaultValue="0" min={0}
                    onChange={({ target: { value } }) => {setQuery({ offset: value }); clear();}}/>
                </Col>
              </Form.Group>
            </Col>
            <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2}>
              <Form.Check inline label='Attributes' type='checkbox' 
                onChange={({ target: { checked } }) => {setQuery({ aggregate: checked }); clear();}}/>                  
            </Col>
            <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2}>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container class="mt-3">
        <Row>
          <BeatLoader size={40} color={"#000000"} loading={ isFetching } />
          {
            !isFetching &&
            showInfo()
          }
          {
            ('' !== error) &&
            <div class="mt-5">
              <Alert variant="danger">
                { error }
              </Alert>
            </div>
          }
        </Row>
      </Container>
    </div>
  );
};


export default SearchUsers;
