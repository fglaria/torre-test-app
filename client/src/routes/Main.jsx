import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';

const Main = () => {
  return (
    <div class="text-center">
      <h2 class="mt-3">Torre Test App</h2>
      <Container class="mt-2">
        <Row>
          <Col>
            <Form.Control  type="text" placeholder="Search here..." />
          </Col>
          <Col>
          <Form.Select>
            <option value="1">Users</option>
            <option value="2">Jobs</option>
          </Form.Select>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Main;
