import { useState, useEffect } from "react"
import axios from "axios"

const Login = () =>{
    axios.defaults.withCredentials = true;

    //state for a form
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    const URL = import.meta.env.VITE_SERVER_URL;

    //onchanging input values
    const HandleChange = () => {
        const {name, value} = event.target

        //upstate form state
        setFormData((prevData) => {
            return{
                ...prevData,
                [name]: value
            }
        })
    }

    //handle onclick when submitting the form
    const HandleSubmit = () => {
        event.preventDefault()
            const logUser = async () => {
                try {
                    const response = await axios.post(`${URL}/login`, formData)
                    console.log(response.data)
                } catch (error) {
                    console.log(error)
                }
                
            }
            logUser()
    }

    const getProfile = () => {
        event.preventDefault()
            const getUser = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/profile')
                    console.log(response.data)
                } catch (error) {
                    console.log(error)
                }
            }
            getUser()
    }



    return(
        <>
        <section>
            <form onSubmit={HandleSubmit}>

                <input type="text"  name="username" onChange={HandleChange} required minLength={4}/>
                <input type="password" name="password" onChange={HandleChange}required minLength={8} />
                <button>Login</button>
            </form>
            <button onClick={getProfile}>Profile</button>
        </section>
        </>
    )
}

export default Login
