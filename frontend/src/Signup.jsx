import wallpaper from "./assets/background-pattern-wallpaper.jpg";
import logoImg from "./assets/ruix logo.png";
import googleLogo from "./assets/google logo.png";
import "./Signup.css";
import { useState } from "react";

export default function () {

    const [userDetails, setUserDetails] = useState({
        name: "",
        email:"",
        password: "",
        checked: false
    })

    const handleChange = () => {
        console.log(userDetails)
        const {name,checked,value} = event.target

        setUserDetails(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }


  return (
    <>
      <div className="container">
        <div className="form-flex-left">
          <img src={logoImg} alt="logo image" className="logo" />
          <h2>SIGN UP</h2>
          <h3>Create an account to get started.</h3>
          <button className="google-login-btn">
            <img src={googleLogo} alt="Google sign in" />
            Sign in with Google
          </button>

          <div className="or-container">
            <span className="or-line"></span>
            <span className="or-text">or</span>
            <span className="or-line"></span>
          </div>

          <form action="">
            <input onChange={handleChange} className="type-input" placeholder="Name" type="text" name="name" required/>
            <input onChange={handleChange} className="type-input" placeholder="Email" type="email" name="email" required/>
            <input onChange={handleChange} className="type-input" placeholder="Password" type="password" name="password" minLength={8}/>
            <input onChange={handleChange} className="check-input" type="checkbox" />
            <label htmlFor="rememberMe">Remember me</label><br />
            <button className="submit-btn">Register</button>
          </form>
          <p className="login-p">
            Already have an account?<span className="login-txt">Log in</span>
          </p>
        </div>
        <div className="wallpaper">
          
        </div>
      </div>
    </>
  );
}
