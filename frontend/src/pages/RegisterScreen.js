import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import axios from 'axios';
import Footer from '../components/Footer';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const redirect = '/';

  // const registerUser = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post('http://localhost:8000/user/', {
  //       email: email,
  //       password: password,
  //       fullName: fullname,
  //       phoneNumber: phoneNumber,
  //       dateOfBirth: dateOfBirth,
  //       gender: gender
  //     });

  //     const user = response.data;
  //     setUserInfo(user);

  //     // Redirect after successful login
  //     if (user) {
  //       navigate('/login');
  //     }
  //   } catch (error) {
  //     setError('Invalid data');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const registerUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/user/', {
        email: email,
        password: password,
        fullName: fullname,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        gender: gender,
      });

      const user = response.data;
      console.log(user);
      setUserInfo(user);

      // Redirect after successful registration
      if (user) {
        alert('Registration is Successful');
        // You can add a delay or show a success message before redirecting
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch (error) {
      // Handle specific errors and display meaningful messages
      if (error.response && error.response.status === 400) {
        setError('User already exists');
      } else if (error.response && error.response.status === 500) {
          setError('Internal Server Error. Please try again later.');
        } else if (error.response && error.response.status === 400) {
          setError('Bad Request. Please check your data.');
        } else {
          setError('Registration failed. Please try again.');
        }
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [ userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("indside sunmitHandler");
    if (password !== confirmPassword) {
      console.log(password);
      console.log("confirm password" + confirmPassword);
      setMessage('Passwords do not match');
    } else {
      // Simulating the dispatch function for the register action
      // Replace this with your actual registration logic
      // setLoading(true);
      // Simulating a successful registration
      registerUser();
      setTimeout(() => {
        setLoading(false);
        setUserInfo({ fullname, email });
      }, 1000);
    }
  };

  return (
    <>
     <Container>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="fullName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            ></Form.Control>
          </Form.Group>

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

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="phoneNumber"
              placeholder="123-456-7890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control
              type="dateOfBirth"
              placeholder="xx-xx-xxxx"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="gender"
              placeholder="Male/ Female"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Container>
    <Footer/>
    </>
   
  );
};

export default RegisterScreen;
