import { useEffect, useState } from "react";
import profileImg from "./assets/profile.png";
import "./Profile.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "./state-redux/actions";

export default function Profile() {
  const userTkn = localStorage.getItem("u_t_n");
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.user.user)
  const [userInfo,setUserInfo] = useState({})

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    try {
      const decodedTkn = jwtDecode(userTkn);
      const user = {
        id: null,
        img: null,
        name: decodedTkn.name,
        email: decodedTkn.email,
      };
      
       dispatch(setUser(user))
       setUserInfo(user)

      const now = Date.now();
      if (decodedTkn.exp * 1000 < now) {
        // navigate('/user/signup')
        console.log("invalid");
      } else {
        console.log("Profile information:", user); // Log user information
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = () => {
    const { value, name, files, result } = event.target;
    if (name === "img") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo((prevData) => ({
          ...prevData,
          img: e.target.result,
        }));
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setUserInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    event.preventDefault()
    setIsEditing(false)
  }

  return (
    <section>
      {userDetails.email !== null ? (
        <div className="profile">
          <img
            src={
                isEditing? userInfo.img === null ? profileImg : userInfo.img:
                userDetails.img === null ? profileImg : userDetails.img
            }
            alt="your profile"
          />
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <label htmlFor="image">upload profile pic</label>
              <input
                type="file"
                accept="image/*"
                id="image"
                onChange={handleChange}
                name="img"
              />

              <label htmlFor="name">Name:</label>
              <input
                type="text"
                value={userInfo.name}
                name="name"
                id="name"
                onChange={handleChange}
              />

              <label htmlFor="email">Email:</label>
              <input
                type="text"
                value={userInfo.email}
                name="email"
                id="email"
                onChange={handleChange}
              />

              <button>Save</button>
            </form>
          ) : (
            <>
              <h3>{userDetails.name}</h3>
              <h4>{userDetails.email}</h4>
              <button onClick={() => setIsEditing(true)}>Edit profile</button>
              <button>LogOut</button>
            </>
          )}
        </div>
      ) : (
        <div>
          <h3>No user</h3>
        </div>
      )}
    </section>
  );
}
