import { useEffect, useState } from "react";
import profileImg from "./assets/profile.png";
import "./Profile.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "./state-redux/actions";
import axios from "axios"

export default function Profile() {
  const userTkn = localStorage.getItem("u_t_n");
  const [count,setCount] = useState(0)
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.user.user)
  const [userInfo,setUserInfo] = useState({})

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    try {
      const decodedTkn = jwtDecode(userTkn);
      const user = {
        id: decodedTkn.id,
        img: decodedTkn.profile_img,
        name: decodedTkn.name,
        email: decodedTkn.email,
      };
      console.log(decodedTkn.exp * 1000)
      console.log("now:", Date.now())
      console.log("diff:" ,decodedTkn.exp * 1000 - Date.now() )
       dispatch(setUser(user))
       setUserInfo({...user, imgPreview: decodedTkn.profile_img})

      const now = Date.now();
      if (decodedTkn.exp * 1000 < now) {
       return navigate('/user/login')
      }
    } catch (error) {
      return navigate('/user/signup')
    }
  }, [count]);

  const handleChange = () => {
    const { value, name, files, result } = event.target;
    if (name === "img") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo((prevData) => ({
          ...prevData,
          img: files[0],
          imgPreview: e.target.result
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

  const handleSubmit = async () => {
    event.preventDefault()

    const formData = new FormData();
    formData.append("id", userDetails.id)
    formData.append("name", userInfo.name);
    formData.append("email", userInfo.email);
    formData.append("img", userInfo.img)


    try {

        const res = await axios.post(
            "http://localhost:5000/update-profile",
       formData
          );
          await localStorage.setItem("u_t_n", res.data.authToken)
        setCount(prevCount => prevCount += 1 )
        setIsEditing(false)
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <section>
      {userDetails.email !== null ? (
        <div className="profile">
          <img
            src={
                isEditing? userInfo.imgPreview === null ? profileImg : userInfo.imgPreview:
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
