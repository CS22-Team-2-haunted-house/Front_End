import React,{useState,useEffect} from 'react'
import Screen from './Game/Game'
import Login from './loginRegister/LoginRegister'
import axios from 'axios'
import status from '../helpers/transfer'

function App(){

  const connector = axios
  const [token,setToken]=useState(null)

  const logout=async e=>{
    connector.post('/api/logout/')
    connector.defaults.headers.common['Authorization']=null
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('north')
    window.localStorage.removeItem('south')
    window.localStorage.removeItem('east')
    window.localStorage.removeItem('west')
    setToken(null)
    setUser({})
  }

  const [user,setUser]=useState({})
  const [error,setError]=useState("")
  //login
  const login=async user=>{
    try {
      let attempt = await connector.post('/api/login/',{...user})
      let data = await attempt.data
      loginKey(data.key)
      setError("")
    } catch (error) {
        console.log(error.response)
        if(error.response.status === 400) {
          setError('Invalid Username or Password')
        } else if (error.response.data === 500) {
          setError('We are having issues with our server, please try again later.')
        }
        return new status(false,error.response.data)
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
      setError('')
    } catch (error) {
      setError(error.response.data.username || error.response.data.password1)
      if (error.response.data.status === 500) {
        setError('We are having issues with our server, please try again later.')
      } 
      
      
      
      return new status(false,error.response.data)
    }
  }

  const testLogin=e=>{
    return token!=null
  }

  const buttons = document.querySelectorAll('button');
  
  // if (process.env.NODE_ENV==='development') {
  //     connector.defaults.baseURL='https://lambda-mud-test.herokuapp.com'
  // }else{
      connector.defaults.baseURL='https://haunted-house-backend.herokuapp.com'
  // }

  useEffect(()=>{
    if (token==null && window.localStorage.getItem('token')!=null) {
      loginKey(window.localStorage.getItem('token'))
      setUser(user)
    }
  },[token, user])

  if(testLogin()) {
    return (
      <Screen connection={connector} user={user} setUser={setUser} logout={logout}/>  
    )
  }else{
    return <Login connection={{login,register}} error={error} setError={setError}/>
  }
}

export default App;