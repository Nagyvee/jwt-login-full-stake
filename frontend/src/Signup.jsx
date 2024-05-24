import wallpaper from "./assets/background-pattern-wallpaper.jpg";
import logoImg from "./assets/ruix logo.png";
import googleLogo from "./assets/google logo.png";
import "./Signup.css";
import { useState, useEffect } from "react";
import {axios} from "axios"

export default function () {

    const [userDetails, setUserDetails] = useState({
        name: "",
        email:"",
        password: "",
        rememberMe: false
    });
    const [allValid, setAllValid] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);

    useEffect(() => {
        setAllValid(isValidEmail && isValidPassword && isValidName);
    }, [isValidEmail,isValidName, isValidPassword]);

    const handleChange = (event) => {
        const { name, value, checked } = event.target;

        // Email validation
        if (name === "email") {
            setIsValidEmail(validateEmail(value));
        }
        
        if (name === "name") {
          setIsValidName(validateName(value));
          console.log(validateName(value))
      }

        // Password validation
        if (name === "password") {
            setIsValidPassword(validatePassword(value));
        }
        // Update the rememberMe field
        if (name === "rememberMe") {
            setUserDetails(prevData => ({
                ...prevData,
                rememberMe: checked 
            }));
        } else {
            setUserDetails(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const validateName = (name) =>{
      const re = /^[a-zA-Z]{4,}$/
      return  re.test(name)
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Form submission 
        if (allValid) {
            console.log("Form is valid:", userDetails);
        } else {
            console.log("Form is invalid. Please correct the errors.", userDetails);
        }
    };

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

                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} className="type-input" placeholder="Name" type="text" name="name" minLength={4} required/>
                        <input onChange={handleChange} className="type-input" placeholder="Email" type="email" name="email" required/>
                        <input onChange={handleChange} className="type-input" placeholder="Password" type="password" name="password" minLength={8}/><br />
                        <input onChange={handleChange} className="check-input" type="checkbox" name="rememberMe" />
                        <label htmlFor="rememberMe">Remember me</label><br />
                        {allValid && <button className="submit-btn" type="submit">Register</button>}
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
