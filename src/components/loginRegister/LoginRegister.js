import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Login.scss'
const Login = props => {
    const [registerForm, setRegister] = useState(false)
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [err, setErr] = useState(false)
    
    const regUser = {
    username: userName,
    password1: password,
    password2: passwordConfirm
        
      };
    const logUser = {
    
    username: userName,
    password: password
    
    };
  

    const handleRegister = event => {
        event.preventDefault();

        if (regUser.password1 === regUser.password2) {
            setErr(false)
            props.connection.register(regUser)
         
        } else {
            setErr(true)
        }
      };

    const handleLogin = event => {
    event.preventDefault();

    console.log(logUser)
    props.connection.login(logUser)
    };
    return (
        // Conditionally rendered form
        <div className="login">
            <form className="form" onSubmit={registerForm ? handleRegister : handleLogin}>
                <h1>{registerForm ? "Register" : "Login"}</h1>
                <label>Username</label>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder= "Password" onChange={(e) => setPassword(e.target.value) }/>
                {registerForm  && 
                <input type="password" placeholder="Confirm Password" onChange={(e) => setPasswordConfirm(e.target.value)}/> }
                {err  && <p className="error">Passwords do not match</p> }
                <button>Submit</button>
            </form>
            {registerForm === false && <p>Not yet registered?</p> }
            <button onClick={() => {
                setRegister(!registerForm)
                setErr(false)
            }}>{registerForm ? "Go Back" : "Register"}</button>
        </div>
       
    )
    

    

}

export default Login