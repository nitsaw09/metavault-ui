import React from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';

/**
 * Login component
 * @returns React.TReactElement
 */
const Login: React.FC = (): React.ReactElement => {
  return (
    <>
    <Container className="wallet-form-wizard">
      <Row className="justify-content-center mt-5">
        <Card>
            <Card.Title className="text-center">MetaVault</Card.Title>
            <Card.Text className="text-center text-smaller">
                Thank you for choosing MetaVault for managing your crypto assets and tokens.
            </Card.Text>
            <Form>
              <Form.Group controlId="formPassword" className="pb-3">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control type="password" placeholder="Enter new password" />
              </Form.Group>
              <Button variant="primary" type="submit" style={{width: '100%'}}>
                Login
              </Button>
            </Form>
        </Card>
      </Row>
    </Container>
    </>
  );
};

export default Login;