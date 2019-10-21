import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Login.css'
const Login = props => {
    const [registerForm, setRegister] = useState(false)
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    
    const handleSubmit = event => {
        event.preventDefault();
    
        const user = {
          username: userName,
          password1: password,
          password2: passwordConfirm
        };
        console.log(user)
        axios
          .post(`https://lambda-mud-test.herokuapp.com/api/registration/`, {
            ...user
          })
          .then(res => {
            console.log(res);
            console.log(res.data);
            // axios.defaults.headers.common[
            //   "Authorization"
            // ] = `Token ${res.data.key}`;
            // props.history.push("/gamemap");
          });
      };
    return (
        // Conditionally rendered form
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h3>{registerForm ? "Register" : "Login"}</h3>
                <label>Username</label>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder= "Password" onChange={(e) => setPassword(e.target.value) }/>
                {registerForm  && 
                <input type="password" placeholder="Confirm Password" onChange={(e) => setPasswordConfirm(e.target.value)}/> }
                <button>Submit</button>
            </form>
            {registerForm === false && <p>Not yet registered?</p> }
            <button onClick={() => setRegister(!registerForm)}>{registerForm ? "Go Back" : "Register"}</button>
        </div>
       
    )
    

    

}

export default Login