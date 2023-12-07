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
import loginImage from '../images/login.png';
// import { validate } from '../../../backend/models/ordersModel';
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css';
// import 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css';


const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullName] = useState('');
  const [finalPassword, setFinalPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [isFullNameValid, setIsFullNameValid] = useState(null);
  const [isSexSelected, setIsSexSelected] = useState(null);
  const [isDoBSelected, setIsDoBSelected] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState( null);
  const [isPhoneValid, setIsPhoneValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [isPasswordMatched, setIsPasswordMatched] = useState(null);

  const redirect = '/';

  useEffect(() => {
    

    

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
        password: finalPassword,
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
    signup(e);
      registerUser();
      setTimeout(() => {
        setLoading(false);
        setUserInfo({ fullname, email });
      }, 1000);
    
  };

  const signup = (e) => {
    // ... (insert the provided signup function here)
    
      //check if all field values are entered and confirm password 
      console.log("inside signup");
      e.preventDefault();
      
      if(finalPassword === "")
        setIsPasswordValid(  "Password is invalid");
    
      setIsSexSelected ( (document.getElementById("male").checked || document.getElementById("female").checked || document.getElementById("other").checked)? "":"Please select Sex");
    
      if(gender === ""){
        // setIsSexSelected(  "Sex is not selected");
        document.getElementById("feedback-sex").style.display="block";
        // document.getElementById("feedback-sex").innerHTML = "Please select an option";
        setIsSexSelected("Please select an option");
      }else{
        setIsSexSelected("");
      }
      if(dateOfBirth === ""){
        setIsDoBSelected(   "Date of Birth is invalid");
      }
      if(email === ""){
        setIsEmailValid( "Email is invalid");
      }
      if(!phoneNumber === ""){
        setIsPhoneValid(  "Phone number is invalid");
      }
      if(finalPassword ===""){
        setIsPasswordValid(  "Password is invalid");
      }
    
    registerUser();
            
         
    
  };

  const validate = (e) => {
    // ... (insert the provided validate function here)
    
      console.log("ID",e.target.id);
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
          let password = document.getElementById("password");
          let passwordStrength = document.getElementById("passwordStrength");
          let alphanumeric = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
          let lowercaseRegex = /[a-z]/g;
          let uppercaseRegex = /[A-Z]/g;
          let specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/g;
          setError ("");
          if (password.value.length < 8) {
            setIsPasswordValid( "Must conatin atleast 8 characters");
            progress.style.display = "flex";
            progressBar.style.width = "25%";
            // progressBar.classNameList.add("bg-danger");
            // passwordStrength.classNameList.add("text-danger");
            // passwordStrength.innerHTML = "Weak";
          } else if (!alphanumeric.test(password.value)) {
            setIsPasswordValid(  "Try a mix of letters and numbers");
            progress.style.display = "flex";
            progressBar.style.width = "25%";
            setError("Weak");
          } else if (password.value.length >= 8 && alphanumeric.test(password.value)) {
            if (
              !(
                lowercaseRegex.test(password.value) &&
                uppercaseRegex.test(password.value) &&
                specialCharRegex.test(password.value)
              )
            ) {
              setIsPasswordValid(
                "Your password must contain a combination of uppercase and lowercase letters, as well as at least one special character. Please ensure your password meets these requirements for enhanced security."
              );
              progress.style.display = "flex";
              progressBar.style.width = "65%";
              setError("Medium");
            }
            else {
              setError( "Looks good");
                progress.style.display = "flex";
                progressBar.style.width = "100%";
                setError("Strong");
                setIsPasswordValid ("");
              }
          }
          break;
        case "confirmPassword":
          let feedbackConfirmPassword = document.getElementById("feedback-confirmPassword");
          let confirmPassword = document.getElementById("confirmPassword");
          
          // feedbackConfirmPassword.innerHTML = "";
          if (finalPassword !== confirmPassword.value) {
            console.log("Password"+finalPassword);
            console.log("confirm password" , confirmPassword.value);
            setIsPasswordMatched("Password and confirm password do not match");
          } else{
            setIsPasswordMatched("");
            
          }
          
        case "fullName":
          let fullName = document.getElementById("fullName");
          // console.log(fullName);
          let feedbackfullName = document.getElementById("feedback-fullName");
          
          if(!regExName.test(fullName.value)){
            setError(  "Full Name is invalid");
            setIsFullNameValid("Full Name is invalid");
      
          }else{
            setError(  "");
            setIsFullNameValid("");
          }
          break;
        case "dob":
          let dob = document.getElementById("dob");
          let feedbackdob = document.getElementById("feedback-dob");
          console.log(dob);
          if(dob ===null || dob ===""){
            setIsDoBSelected(  "Date of Birth is invalid");
            
          }else{
            
            setIsDoBSelected("");
          }
          break;
    
        case "email":
          let email = document.getElementById("email");
          let feedbackemail = document.getElementById("feedback-email");
          console.log(email.value);
          if(!regExEmail.test(email.value)){
            
            setIsEmailValid(  "Email is invalid");
            
          }else{
            
            setIsEmailValid ("");
          }
          break;
        case "phone": //check again
          let phone = document.getElementById("phone");
          let feedbackphone = document.getElementById("feedback-phone");
          console.log("phone "+ phone.value);
          if(!regExPhone.test(phone.value)){
            setError(  "Phone number is invalid");
            setIsPhoneValid ("Phone number is invalid");
          }else{
            console.log("phone regex matches");
            setError(  "");
            setIsPhoneValid ("");
          }
          break;
      }
    
     
    
  };

  return (
<>
      <NavBar />
      <div className="container mt-lg-5">
        <div className="row">
          <div className="col-md-5">
            <img src={loginImage} alt="SignUp" className="img-fluid" style={{ height: '350px' }} />
          </div>

          <div className="col-md-7">
            <form className="row g-3 needs-validation" onSubmit={submitHandler}>
              <div className="col-md-6">
                <label htmlFor="fullName" className="form-label">
                  Full name
                </label>
                <input
                  type="text"
                  className={`form-control ${isFullNameValid ? 'is-invalid' : ''}`}
                  id="fullName"
                  onChange={(e) => {setFullName(e.target.value)
                  validate(e);
                }}
                  required
                />
                <div className="invalid-feedback" id="feedback-fullName">
                  {error}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label d-block">Sex</label>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" id="male" type="radio" name="sex" required 
                    onChange={(e) => {
                      setGender(e.target.value);
                      } }/>
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" id="female" type="radio" name="sex" onChange={(e) => {
                      setGender(e.target.value);
                      } } required />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" id="other" type="radio" name="sex" onChange={(e) => {
                      setGender(e.target.value);
                      } } required />
                    <label className="form-check-label" htmlFor="other">
                      Other
                    </label>
                  </div>
                </div>
                <div className="invalid-feedback" id="feedback-sex"></div>
                {isSexSelected && <div className="invalid-feedback">{isSexSelected}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="dob" className="form-label">
                  Date Of Birth
                </label>
                <input type="date" name="date" className={`form-control ${isDoBSelected ? 'is-invalid' : ''}`} id="dob" 
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                  console.log(dateOfBirth);
                  validate(e);} }required />
                {isDoBSelected && <div className="invalid-feedback">{isDoBSelected}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className={`form-control ${isEmailValid ? 'is-invalid' : ''}`} id="email"
                 onChange={(e) => {
                  setEmail(e.target.value);
                  validate(e);}}
                   required />
                {isEmailValid && <div className="invalid-feedback">{isEmailValid}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input type="tel" className={`form-control ${isPhoneValid ? 'is-invalid' : ''}`} id="phone" 
                onChange={(e) => {setPhoneNumber(e.target.value);
                  validate(e);}} required />
                {isPhoneValid && <div className="invalid-feedback">{isPhoneValid}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${isPasswordValid ? 'is-invalid' : ''}`}
                  id="password"
                  onChange={(e) => {
                    setFinalPassword(e.target.value);
                    console.log(finalPassword+"Final")
                    validate(e);}}
                  required
                />

                <div className="progress mt-2" id="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ height: '0.3rem' }}>
                  <div className="progress-bar" id="progress-bar"></div>
                </div>

                <p id="passwordStrength" className="m-0 p-0"></p>

                
                {isPasswordValid && <div className="invalid-feedback" id="feedback-password">{isPasswordValid}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm password
                </label>
                <input
                  type="password"
                  className={`form-control ${isPasswordMatched ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validate(e);}}
                  required
                />
                {isPasswordMatched && <div className="invalid-feedback" id="feedback-confirmPassword">{isPasswordMatched}</div>}
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