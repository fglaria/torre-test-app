import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Accordion } from 'react-bootstrap';
import BeatLoader from 'react-spinners/BeatLoader';

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
  const [isFetching, setIsFetching] = useState(false);
  const [info, setInfo] = useState(false);
  const [error, setError] = useState('');

  const [query, setQuery] = useMergingState({
    text: '',
    type: 'users',
  });

  const clear = () => {
    setInfo(false);
    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if ('' !== query.text) {
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
    }
    else {
      setError('No query');
    }
  };

  const showInfo = () => {
    if (info)
    {
      switch (query.type)
      {
        case 'users':
          return showUserInfo();
        case 'jobs':
          return showJobInfo();
        default:
          return showError();
      }
    }
  };

  const showUserInfo = () => {
    console.log(info);
    return (
      <div class="mt-3">
        <img src={ info.person.pictureThumbnail } alt=''></img>
        <p>{ info.person.name }</p>
        <Accordion defaultActiveKey="0" >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Information</Accordion.Header>
            <Accordion.Body>
              <p>{ info.person.professionalHeadline }</p>
              <p>{ info.person.location.name }</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Links</Accordion.Header>
            <Accordion.Body>
              {
                info.person.links.map((l, index) =>
                  <p key={ index }>
                    <a href={ l.address }>{ l.name }</a>
                  </p>
                )
              }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  };

  const showJobInfo = () => {
    console.log("job info");
  };

  const showError = () => {
    setError('No valid type');
  };

  return (
    <div class="text-center">
      <h2 class="mt-3">Torre Test App</h2>
      <Container class="mt-2" fluid>
        <Form onSubmit={ onSubmit }>
          <Row>
            <Col xxl={10} xl={10} lg={8} md={8} sm={8} xs={6}>
              <Form.Control type="text" placeholder="Search here..." 
                onChange={({ target: { value } }) => {setQuery({ text: value }); clear();}}/>
            </Col>
            <Col>
            <Form.Select 
              onChange={({ target: { value } }) => {setQuery({ type: value }); ; clear();}}>
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
}

export default Main;
