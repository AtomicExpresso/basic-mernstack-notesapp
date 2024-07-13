import React, {useState} from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup.tsx";

export default function SignupForm() {
  const [formState, setFormState] = useState({
    email: '',
    username: '',
    password: ''
  });

  const {signup, error, isLoading} = useSignup()

  const HandleFormChange = (e) => {
    const {value, name} = e.target;

    setFormState(prevState => {
      const newState = {...prevState,
        [name]: value
      }

      return newState
    })
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    await signup(formState.email, formState.username, formState.password)
  }

  const incorrectStyle = {
    border: "solid 2px #f93d5d"
  }
console.log(formState)
  return (
    <div className="login-form-container">
      <div className="login-form">
        <div className="login-title">
          <h1>Sign up</h1>
        </div>
        <form onSubmit={HandleSubmit}>
          <label htmlFor="email">Email</label>
            <input 
              type="text"
              name="email"
              placeholder="email"
              onChange={(e) => HandleFormChange(e)}
              className="form-control"
              minLength={3}
              maxLength={10}
              style={
                error === "Email already in use" || 
                error === "Please put a valid email address" ? 
                  incorrectStyle : {border: ""}}
            >
          </input>
          <label htmlFor="username">Username</label>
            <input 
              type="text"
              name="username"
              placeholder="username"
              onChange={(e) => HandleFormChange(e)}
              className="form-control"
              minLength={3}
              maxLength={10}
              style={
                error === "Username require's atleast 3 characters" ||
                error === "Username isnt avaible" ? 
                  incorrectStyle : {border: ""}}
            >
            </input>
          <label htmlFor="password">Password</label>
            <input
              type="text" 
              name="password"
              placeholder="password"
              onChange={(e) => HandleFormChange(e)}
              minLength={3}
              maxLength={16}
              className="form-control"
              style={
                error === "Please put a stronger password" ? 
                  incorrectStyle : {border: ""}}
            >
            </input>
          <button disabled={isLoading} type="submit" className="btn btn-success">Signup</button>
          {error ?
            <div className="login-error-message">
              <h2>{error}</h2>
            </div> 
          : null}
        </form>
      <span>Already have an account? <Link to="/login">Login</Link></span>
      </div>
    </div>
  )
}