import React from 'react'
import Char from './char_screen'
import status from '../helpers/transfer'

function Game(props) {

    const getData=async (e)=>{
        try {
            let request = await props.connection.get('/api/adv/init/')
            let data = await request.data
            props.setUser({...data})
        } catch (error) {
            return new status(false,error.response.data)
        }
    }

    const init=async e=>{
        try {
            let request = await props.connection.get('/api/adv/init/')
            let data = request.data
            props.setUser({...data})
        } catch (error) {
            return status(false,error.response.data)
        }
    }

    const move=async e=>{
        try {
            let request = await props.connection.get('/api/adv/move',{direction:e})
            let data = request.data
            props.setUser({...data})
        } catch (error) {
            
        }
    }

    return (
        <div>
            <p>game</p>
            <p>user Object:
                <ul>

                {Object.keys(props.user).map((keyname,i)=>(
                    <li>
                        {keyname}: {props.user[keyname]}
                    </li>
                ))}
                </ul>
            </p>
            <button onClick={props.logout}>
                logout
            </button>
            <button onClick={getData}>
                Get Data
            </button>
            <button onClick={init}>
                Initialize
            </button>

            
        </div>
    )
}

export default Game
