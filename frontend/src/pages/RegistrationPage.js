import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppBar } from "@mui/material";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const RegistrationForm = () => {
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    try{
        const response = await axios.post("http://localhost:8000/user/", data);
        console.log(response)
        
        if (response.status === 200 || response.status === 201) {
          navigate('/login');
        } 
        
    }catch(error){
        if(error.response.status === 400){
            alert("User already exists");
          }
          else {
            alert("Server error: " + error);
          }
    }

      console.log(data);
  };

  const login = () =>{
    navigate(`/login`);
  }

  return (
    <>
       <NavBar/>
      <div className="container mt-lg-5">
      <div className="row">
        <div className="col-md-5">
          <img
            src="https://t4.ftcdn.net/jpg/05/58/06/81/360_F_558068185_sZmfyrWuzHTfzLdwJuj1ALQcBtbKAtbA.jpg"
            alt="SignUp"
            className="img-fluid"
            style={{ height: "350px" }}
          />
        </div>

        <div className="col-md-7">
          <form
            className="row g-3 needs-validation"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 3,
                    message: "First name must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "First name cannot exceed 20 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Only alphabets are allowed in the first name",
                  },
                })}
              />
              <div className="invalid-feedback">
                {errors.firstName?.message}
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                id="lastName"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 3,
                    message: "Last name must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Last name cannot exceed 20 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Only alphabets are allowed in the last name",
                  },
                })}
              />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label d-block">Sex</label>
                <div className="form-check form-check-inline">
                  <input
                    className={`form-check-input ${
                      errors.gender ? "is-invalid" : ""
                    }`}
                    id="male"
                    type="radio"
                    value="male"
                    name="gender"
                    {...register("gender", {
                      required: "Please select your gender",
                    })}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className={`form-check-input ${
                      errors.gender ? "is-invalid" : ""
                    }`}
                    id="female"
                    type="radio"
                    name="gender"
                    value="female"
                    {...register("gender", {
                      required: "Please select your gender",
                    })}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className={`form-check-input ${
                      errors.gender ? "is-invalid" : ""
                    }`}
                    id="other"
                    type="radio"
                    name="gender"
                    value="other"
                    {...register("gender", {
                      required: "Please select your gender",
                    })}
                  />
                  <label className="form-check-label" htmlFor="other">
                    Other
                  </label>
                </div>
              </div>
              <div className="invalid-feedback">{errors.gender?.message}</div>
            </div>

            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern:
                    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,4}$/i,
                })}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            <div className="col-md-6">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },        
                  validate: {
                    containsAlphabet: (value) => /[A-Za-z]/.test(value) || "Password must contain at least one alphabet",
                    containsNumber: (value) => /\d/.test(value) || "Password must contain at least one number",
                    containsSpecialChar: (value) => /[@$!%*?&#]/.test(value) || "Password must contain at least one special character",
                  },         
                })}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>

            <div className="col-md-6">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm password
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              <div className="invalid-feedback">
                {errors.confirmPassword?.message}
              </div>
            </div>
            <div className="col-12 text-center">
              <button className="btn btn-primary" type="submit" disabled={!isValid}>
                Sign Up
              </button>
            </div>
            <p className="text-center">
              Already have an account? <a onClick={login} style={{color: 'blue', textDecoration: 'underline'}}>Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
        <Footer/>
    </>
  );
};

export default RegistrationForm;
