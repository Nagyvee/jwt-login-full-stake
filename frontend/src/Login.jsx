import { useState } from "react"
import axios from "axios"

const Login = () =>{

    //state for a form
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

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
        console.log(formData)
    }

    //handle onclick when submitting the form
    const HandleSubmit = () => {
        event.preventDefault()
        console.log('submitted')
    }



    return(
        <>
        <section>
            <form onSubmit={HandleSubmit}>
                <input type="text"  name="username" onChange={HandleChange} required minLength={4}/>
                <input type="password" name="password" onChange={HandleChange}required minLength={8} />
                <button>Login</button>
            </form>
        </section>
        </>
    )
}

export default Login
