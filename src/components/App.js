import React,{useState,useEffect} from 'react'
import Screen from './Game/Game'
import Login from './loginRegister/LoginRegister'
import axios from 'axios'
import '../styles/App.css';
function App(){

  const connector = axios
  const [token,setToken]=useState(null)
  const [user,setUser]=useState(null)

  //login
  const login =async (user)=>{
    try {
      let attempt = await connector.post('/api/login/',{...user})
      console.log('attempt ',attempt)
      let data = await attempt.data
      console.log('data ', data)
    } catch (error) {
        console.error(error)
    }
  }

  const loginKey=async(tok)=>{
      connector.defaults.headers.common['Authorization']=`Token ${tok}`
      setToken(tok)
  }

  const register=async (user)=>{
    try {
      let attempt = await connector.post('/api/registration/', {...user})
      console.log('attempt ',attempt)
      let data = await attempt.data
      console.log('data ', data)
    } catch (error) {
      console.log('here');
      console.log(error.request);
      // console.error(error.toJSON())
    }
  }

  const testLogin=e=>{
    return token!=null
  }

  
  if (process.env.NODE_ENV==='development') {
      connector.defaults.baseURL='https://lambda-mud-test.herokuapp.com'
  }
  if (window.localStorage.getItem('token')) {
      loginKey(window.localStorage.getItem('token'))
  }

  useEffect(()=>{
    if (token==null && window.localStorage.getItem('token')!=null) {
      loginKey(window.localStorage.getItem('token'))
    }
  },[token])

  if(testLogin()) {
    return (
      <Screen connection={{connector,user}}/>  
    )
  }else{
    return <Login connection={{login,register}}/>
  }
}

export default App;
