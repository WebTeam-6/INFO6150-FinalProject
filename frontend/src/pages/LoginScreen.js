import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import axios from 'axios';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const redirect = '/';
  const nextRedirect = '/home';

  const loginUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/user/login', {
        email: email,
        password: password,
      });

      const user = response.data;
      setUserInfo(user);

      localStorage.setItem('token', user.token);

      // Redirect after successful login
      if (user) {
        navigate(nextRedirect);
      }
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   // Only call loginUser if email and password are not empty
  //   if (email && password) {
  //     loginUser();
  //   }
  // }, [navigate, email, password]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Call the loginUser function directly within submitHandler
    loginUser();
  };

  return (
    <Container>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Container>
  );
};

export default LoginScreen;
