import React from 'react'

function Login(props) {
    return (
        <div>
            <p>
                Login Page
            </p>
            <button onClick={()=>props.connection.login({user:"AshenPheonix",pass:"doubleblind"})}>
                Login
            </button>
            <button onClick={()=>props.connection.register({user:"AshenPheonix",pass:"doubleblind",pass2:'doubleblind'})}>
                Register
            </button>
        </div>
    )
}

export default Login
