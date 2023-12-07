import React from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =async  (data) => {
    const response = await axios.post("http://localhost:8000/user/login", data);
    console.log("response", response);
    localStorage.setItem("token", response.data.token);
    const token = localStorage.getItem('token');
    console.log("token", token);
    const decodedToken = jwtDecode(token);
    if (response.status === 200) {
      if(decodedToken.isAdmin == true){
        navigate('/dashboard');
      }
      else{
        navigate('/');
      }
    } else {
        console.error("Server error:", response.statusText);
    }
    console.log(data);
  };

  const redirect = () =>{
    navigate(`/register`);
  }

  return (
    <>
    <NavBar/>
    <div className="container mt-lg-5">
      <div className="row">
        <div className="col-md-6">
          <img src="https://t4.ftcdn.net/jpg/05/58/06/81/360_F_558068185_sZmfyrWuzHTfzLdwJuj1ALQcBtbKAtbA.jpg" alt="login" className="img-fluid" style={{ height: "350px" }} />
        </div>

        <div className="col-md-6">
          <h1 className="text-start">Login</h1>
          <p className="text-start">
            Don't have an account? <a onClick={redirect} style={{color: 'blue', textDecoration: 'underline'}}>Register</a>
          </p>
          <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-12" style={{ width: "70%" }}>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className={`form-control ${errors.email && "is-invalid"}`}
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="col-md-12" style={{ width: "70%" }}>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password && "is-invalid"}`}
                id="password"
                {...register("password", { required: "Password is required" })}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <div className="col-8 text-center">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default LoginForm;
