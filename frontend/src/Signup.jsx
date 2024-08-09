import wallpaper from "./assets/background-pattern-wallpaper.jpg";
import logoImg from "./assets/ruix logo.png";
import googleLogo from "./assets/google logo.png";
import "./Signup.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function () {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isCreated, setIsCreated] = useState(false);
  const [allValid, setAllValid] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isLogging, setIsLogging] = useState(true)

  axios.defaults.withCredentials = true;
  useEffect(() => {
    if(!isLogging){
        setAllValid(isValidEmail && isValidPassword && isValidName);
    }
     if(isLogging)   setAllValid(isValidEmail && isValidPassword);
    
    
  }, [isValidEmail, isValidName, isValidPassword]);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    // Email validation
    if (name === "email") {
      setIsValidEmail(validateEmail(value));
    }

    if (name === "name") {
      setIsValidName(validateName(value));
    }

    // Password validation
    if (name === "password") {
      setIsValidPassword(validatePassword(value));
    }
    // Update the rememberMe field
    if (name === "rememberMe") {
      setUserDetails((prevData) => ({
        ...prevData,
        rememberMe: checked,
      }));
    } else {
      setUserDetails((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateName = (name) => {
    const re = /^[a-zA-Z\s]{4,}$/;
    return re.test(name);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const URL = import.meta.env.VITE_SERVER_URL
    // Form submission
    if (allValid) {
      try {
        if(!isLogging){
        const response = await axios.post(
          `${URL}/register`,
          userDetails
        );
        setIsCreated(true);
    }
        const response2 = await axios.post(
            `${URL}/login", userDetails`,
        )
        const data = response2.data;
        await localStorage.setItem("u_t_n", data.authToken);
        console.log(response2)
        navigate("/user/profile")
        
      } catch (error) {
        console.log(error);
      } finally{
        setIsCreated(false)
      }
    } else {
      console.log("Form is invalid. Please correct the errors.", userDetails);
    }
  };

  return (
    <>
      <div className="container">
        <div className="form-flex-left">
          <img src={logoImg} alt="logo image" className="logo" />

          {!isCreated ? (
            <>
            {!isLogging?
            <>
             <h2>SIGN UP</h2>
              <h3>Create an account to get started.</h3>
              </>:
              <h2>Login</h2>
          }
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
             {!isLogging &&   <input
                  onChange={handleChange}
                  className="type-input"
                  placeholder="Name"
                  type="text"
                  name="name"
                  minLength={4}
                  required
                />
             }
                <input
                  onChange={handleChange}
                  className="type-input"
                  placeholder="Email"
                  type="email"
                  name="email"
                  required
                />
                <input
                  onChange={handleChange}
                  className="type-input"
                  placeholder="Password"
                  type="password"
                  name="password"
                  minLength={8}
                />
                <br />
                <input
                  onChange={handleChange}
                  className="check-input"
                  type="checkbox"
                  name="rememberMe"
                />
                <label htmlFor="rememberMe">Remember me</label>
                <br />
                {allValid && (
                  <button className="submit-btn" type="submit">
                   {!isLogging? "Register" : "Login"}
                  </button>
                )}
              </form>
             {!isLogging ? <p className="login-p">
                Already have an account?
                <span className="login-txt" onClick={() => setIsLogging(true)}>Log in</span>
              </p>:
              <p className="login-p">
              Don't have account?
              <span className="login-txt" onClick={() => setIsLogging(false)}>Sign up</span>
            </p>

            }
            </>
          ) : (
            <div>
              <h2>your account is created successfully</h2>
              <h4>Please wait while I'm setting your profile</h4>
            </div>
          )}
        </div>
        <div className="wallpaper"></div>
      </div>
    </>
  );
}
