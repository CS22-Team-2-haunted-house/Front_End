import React,{useEffect} from 'react'
import Char from './char_screen'
import status from '../helpers/transfer'
import MoveBar from './movebar/movements'

function Game({user,setUser,logout}) {

    const getData=async (e)=>{
        try {
            let request = await connection.get('/api/adv/init/')
            let data = await request.data
            setUser({...data})
        } catch (error) {
            return new status(false,error.response.data)
        }
    }

    const init=async e=>{
        try {
            let request = await connection.get('/api/adv/init/')
            let data = request.data
            setUser({...data})
        } catch (error) {
            return status(false,error.response.data)
        }
    }

    const move=async e=>{
        try {
            let request = await connection.post('/api/adv/move',{direction:e})
            let data = request.data
            setUser({...data})
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        if (user.title==null) {
            init()
        }
    },[user])

    return (
        <div>
            <p>game</p>
            <p>user Object:
                <ul>

                {Object.keys(user).map((keyname,i)=>(
                    <li>
                        {keyname}: {user[keyname]}
                    </li>
                ))}
                </ul>
            </p>
            <button onClick={logout}>
                logout
            </button>
            <button onClick={getData}>
                Get Data
            </button>
            <button onClick={init}>
                Initialize
            </button>
            <p>
                Room Title: {user.title || "Empty"}
            </p>
            <p>
                Desc: {user.description}
            </p>
            <MoveBar move={move}/>
        </div>
    )
}

export default Game
