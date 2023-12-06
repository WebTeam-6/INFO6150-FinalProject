import React, { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { Form, Button, Row, Col, Container } from 'react-bootstrap';
// import Message from '../components/Message';
// import Loader from '../components/Loader';
// import FormContainer from '../components/FormContainer';
import axios from 'axios';
import NavBar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
// import {LoginImage} from '../assets/login.png';
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css';
// import 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css';


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
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [isSexSelected, setIsSexSelected] = useState(false);
  const [isDoBSelected, setIsDoBSelected] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

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

  useEffect(() => {
    const validate = (e) => {
      // ... (insert the provided validate function here)
      
        console.log(e.target.id);
        const id = e.target.id;
        const regExName = /^[a-zA-Z]{3,10}$/;
        const regExEmail = /([\w\.]+)@([\w\.]+)\.(\w+)/;
        //const regExPhone = /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/;
        const regExPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        switch(id){
          case "password":
            let feedbackPassword = document.getElementById("feedback-password");
            let progressBar = document.getElementById("progress-bar");
            let progress = document.getElementById("progress");
            let passwordStrength = document.getElementById("passwordStrength");
          
            let password = document.getElementById("password");
            let alphanumeric = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
            let lowercaseRegex = /[a-z]/g;
            let uppercaseRegex = /[A-Z]/g;
            let specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/g;
            setIsPasswordValid (false);
            if (password.value.length < 8) {
              setError( "Must conatin atleast 8 characters");
              progress.style.display = "flex";
              progressBar.style.width = "25%";
              progressBar.classNameList.add("bg-danger");
              passwordStrength.classNameList.add("text-danger");
              passwordStrength.innerHTML = "Weak";
            } else if (!alphanumeric.test(password.value)) {
              setError(  "Try a mix of letters and numbers");
              progress.style.display = "flex";
              progressBar.style.width = "25%";
              progressBar.classNameList.add("bg-danger");
              passwordStrength.classNameList.add("text-danger");
              passwordStrength.innerHTML = "Weak";
            } else if (password.value.length >= 8 && alphanumeric.test(password.value)) {
              if (
                !(
                  lowercaseRegex.test(password.value) &&
                  uppercaseRegex.test(password.value) &&
                  specialCharRegex.test(password.value)
                )
              ) {
                setError( 
                  "Your password must contain a combination of uppercase and lowercase letters, as well as at least one special character. Please ensure your password meets these requirements for enhanced security."
                );
                progress.style.display = "flex";
                progressBar.style.width = "65%";
                progressBar.classNameList.remove("bg-danger");
                progressBar.classNameList.add("bg-warning");
                passwordStrength.classNameList.remove("text-danger");
                passwordStrength.classNameList.add("text-warning");
                passwordStrength.innerHTML = "Medium";
              }
              else {
                setMessage( "Looks good");
                  progress.style.display = "flex";
                  progressBar.style.width = "100%";
                  progressBar.classNameList.remove("bg-danger");
                  progressBar.classNameList.remove("bg-warning");
                  progressBar.classNameList.add("bg-success");
                  passwordStrength.classNameList.remove("text-danger");
                  passwordStrength.classNameList.remove("text-warning");
                  passwordStrength.classNameList.add("text-success");
                  passwordStrength.innerHTML = "Strong";
                  setIsPasswordValid (true);
                }
            }
            break;
          case "confirmPassword":
            let feedbackConfirmPassword = document.getElementById("feedback-confirmPassword");
            let confirmPassword = document.getElementById("confirmPassword");
            feedbackConfirmPassword.classNameList.remove("invalid-feedback");
            confirmPassword.classNameList.remove("is-invalid");
            feedbackConfirmPassword.innerHTML = "";
          case "firstName":
            let firstName = document.getElementById("firstName");
            let feedbackFirstname = document.getElementById("feedback-firstname");
            if(!regExName.test(firstName.value)){
              setError(  "First Name is invalid");
              setIsFirstNameValid (false);
            }else{
              setMessage("") ;
              setIsFirstNameValid (true);
            }
            break;
          case "lastName":
            let lastName = document.getElementById("lastName");
            let feedbacklastname = document.getElementById("feedback-lastname");
            if(!regExName.test(lastName.value)){
              setError(  "Last Name is invalid");
              setIsLastNameValid (false);
            }else{
              setMessage(lastName, feedbacklastname, "");
              setIsLastNameValid (true);
            }
            break;
          case "dob":
            let dob = document.getElementById("dob");
            let feedbackdob = document.getElementById("feedback-dob");
            if(dob ===null || dob ===""){
              setError(  "Date of Birth is invalid");
              setIsDoBSelected  (false);
            }else{
              setMessage(dob, feedbackdob, "");
              setIsDoBSelected(true);
            }
            break;
      
          case "email":
            let email = document.getElementById("email");
            let feedbackemail = document.getElementById("feedback-email");
            if(!regExEmail.test(email.value)){
              setError(  "Email is invalid");
              setIsEmailValid(false);
            }else{
              setMessage(email, feedbackemail, "");
              setIsEmailValid (true);
            }
            break;
          case "phone": //check again
            let phone = document.getElementById("phone");
            let feedbackphone = document.getElementById("feedback-phone");
            console.log("phone "+ phone.value);
            if(!regExPhone.test(phone.value)){
              setError(  "Phone number is invalid");
              setIsPhoneValid (false);
            }else{
              console.log("phone regex matches");
              setMessage(phone, feedbackphone, "");
              setIsPhoneValid (true);
            }
            break;
        }
      
        if(document.getElementById("male").checked || document.getElementById("female").checked || document.getElementById("other").checked){
          document.getElementById("female").classNameList.remove("is-invalid");
          document.getElementById("male").classNameList.remove("is-invalid");
          document.getElementById("other").classNameList.remove("is-invalid");
          document.getElementById("feedback-sex").classNameList.remove("invalid-feedback");
          document.getElementById("feedback-sex").style.display="none";
          document.getElementById("feedback-sex").innerHTML = "";
        }
       
      
    };

    const signup = (e) => {
      // ... (insert the provided signup function here)
      
        //check if all field values are entered and confirm password 
        e.preventDefault();
        let password = document.getElementById("password");
        let feedbackConfirmPassword = document.getElementById("feedback-confirmPassword");
        let confirmPassword = document.getElementById("confirmPassword");
        setIsPasswordMatched(false) ;
        if(password.value === confirmPassword.value){
          setIsPasswordMatched (true);
        }
      
      
        setIsSexSelected ( (document.getElementById("male").checked || document.getElementById("female").checked || document.getElementById("other").checked)? true:false);
      
        if(!isFirstNameValid){
          setError(  "First Name is invalid");
        }
        if(!isLastNameValid){
          setError(  "Last Name is invalid");
        }
        if(!isSexSelected){
          document.getElementById("female").classNameList.add("is-invalid");
          document.getElementById("male").classNameList.add("is-invalid");
          document.getElementById("other").classNameList.add("is-invalid");
      
          document.getElementById("feedback-sex").classNameList.add("invalid-feedback");
          document.getElementById("feedback-sex").style.display="block";
          document.getElementById("feedback-sex").innerHTML = "Please select an option";
        }
        if(!isDoBSelected){
          setError(   "Date of Birth is invalid");
        }
        if(!isEmailValid){
          setError( "Email is invalid");
        }
        if(!isPhoneValid){
          setError(  "Phone number is invalid");
        }
        if(!isPasswordValid){
          setError(  "Password is invalid");
        }
        if(confirmPassword.value === "" || confirmPassword.value === null){
          setError(  "Password is invalid");
        }
      
        if(isFirstNameValid && isLastNameValid && isSexSelected && isDoBSelected && isEmailValid &&
          isPhoneValid && isPasswordValid ){
            if(!isPasswordMatched){
              setError(  "Password doesn't match");
            }else{
              registerUser();
              
             }
         }
          
      
    };

    document.addEventListener('input', validate);
    document.addEventListener('submit', signup);

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      document.removeEventListener('input', validate);
      document.removeEventListener('submit', signup);
    };
  }, []); // Empty dependency array ensures this effect runs once after the initial render



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
    setMessage(null);
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
      <NavBar />
      <div className="container mt-lg-5">
        <div className="row">
          <div className="col-md-5">
            <img src="../images/login.png" alt="SignUp" className="img-fluid" style={{ height: '350px' }} />
          </div>

          <div className="col-md-7">
            <form className="row g-3 needs-validation" onSubmit={submitHandler}>
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <div className="invalid-feedback" id="feedback-firstname"></div>
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <div className="invalid-feedback" id="feedback-lastname"></div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label d-block">Sex</label>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" id="male" type="radio" name="sex" required />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" id="female" type="radio" name="sex" required />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" id="other" type="radio" name="sex" required />
                    <label className="form-check-label" htmlFor="other">
                      Other
                    </label>
                  </div>
                </div>
                <div className="invalid-feedback" id="feedback-sex"></div>
              </div>
              <div className="col-md-6">
                <label htmlFor="dob" className="form-label">
                  Date Of Birth
                </label>
                <input type="date" name="date" className="form-control" id="dob" onChange={(e) => setDateOfBirth(e.target.value)} required />
                <div className="invalid-feedback" id="feedback-dob"></div>
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} required />
                <div className="invalid-feedback" id="feedback-email"></div>
              </div>
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input type="tel" className="form-control" id="phone" onChange={(e) => setPhoneNumber(e.target.value)} required />
                <div className="invalid-feedback" id="feedback-phone"></div>
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div className="progress mt-2" id="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ height: '0.3rem' }}>
                  <div className="progress-bar" id="progress-bar"></div>
                </div>

                <p id="passwordStrength" className="m-0 p-0"></p>

                <div className="invalid-feedback" id="feedback-password"></div>
              </div>
              <div className="col-md-6">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div className="invalid-feedback" id="feedback-confirmPassword"></div>
              </div>

              <div className="col-12 text-center">
                <button className="btn btn-primary" type="submit">
                  Sign Up
                </button>
              </div>
              <p className="text-center">
              Have an Account?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
              </Link>
              </p>
            </form>
          </div>
          </div>
      </div>
      <Footer/>
  </>
  );
};

export default RegisterScreen;