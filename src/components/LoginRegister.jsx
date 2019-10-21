import React from 'react'

function Login(props) {
    return (
        <div>
            <p>
                Login Page
            </p>
            <button onClick={()=>props.connection.login("AshenPheonix","doubleblind")}>
                Login
            </button>
            <button onClick={()=>props.connection.register("AshenPheonix","doubleblind",'doubleblind')}>
                Register
            </button>
        </div>
    )
}

export default Login
