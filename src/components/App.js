import React,{useState,useEffect} from 'react'
<<<<<<< HEAD
import Screen from './Game/Game'
import Login from './loginRegister/LoginRegister'
=======
import Screen from './Game'
import Login from './LoginRegister'
>>>>>>> f5da65ba3471e33b699f8efcdf70e95fb8aaf792
import axios from 'axios'
import status from '../helpers/transfer'

function App(){

  const connector = axios
  const [token,setToken]=useState(null)

  const logout=async e=>{
    connector.post('/api/logout/')
    connector.defaults.headers.common['Authorization']=null
    window.localStorage.removeItem('token')
    setToken(null)
    setUser({})
  }

  const [user,setUser]=useState({})

  //login
  const login=async user=>{
    try {
      let attempt = await connector.post('/api/login/',{...user})
      let data = await attempt.data
      loginKey(data.key)
    } catch (error) {
        return status(false,error.response.data)
    }
  }

  const loginKey=async(tok)=>{
      connector.defaults.headers.common['Authorization']=`Token ${tok}`
      window.localStorage.setItem('token',tok)
      setToken(tok)
  }

  const register=async (user)=>{
    try {
      let attempt = await connector.post('/api/registration/',{...user})
      let data = await attempt.data
      loginKey(data.key)     
    } catch (error) {
      return status(false,error.response.data)
    }
  }

  const testLogin=e=>{
    return token!=null
  }
  
  if (process.env.NODE_ENV==='development') {
      connector.defaults.baseURL='https://lambda-mud-test.herokuapp.com'
  }

  useEffect(()=>{
    if (token==null && window.localStorage.getItem('token')!=null) {
      loginKey(window.localStorage.getItem('token'))
<<<<<<< HEAD
      setUser(user)
    }
  },[token, user])
=======
    }
  },[token])
>>>>>>> f5da65ba3471e33b699f8efcdf70e95fb8aaf792

  if(testLogin()) {
    return (
      <Screen connection={connector} user={user} setUser={setUser} logout={logout}/>  
    )
  }else{
    return <Login connection={{login,register}}/>
  }
}

export default App;