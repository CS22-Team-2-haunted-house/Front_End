import React, {useState} from 'react'
import './login.css'
const Login = props => {
    const [loginForm, setLogin] = useState(false)

    return (
        <div>
            <form className="form">
                <h3>{loginForm ? "Login" : "Register"}</h3>
                <label>Username</label>
                <input type="text" placeholder="Username" />
                <label>Password</label>
                <input type="password" placeholder= "Password" />
            </form>
            {loginForm === false && <p>Not yet registered?</p> }
            <button onClick={() => setLogin(!loginForm)}>{loginForm ? "Go Back" : "Register"}</button>
        </div>
       
    )
    

    

}

export default Login