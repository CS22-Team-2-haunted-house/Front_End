import React from 'react'
import Char from '../charScreen/char_screen'
import status from '../../helpers/transfer'
import './Game.scss'
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
            console.log({...data})
        } catch (error) {
            return status(false,error.response.data)
        }
    }

    const move=async e=>{
        try {
            let request = await props.connection.post('/api/adv/move',{direction: e})
            let data = request.data
            props.setUser({...data})
        } catch (error) {
            
        }
    }

    return (
        <div className="game">
            <p>game</p>
            <p>user Object:
                
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
            <h3 onClick={(e) => move(e.target.textContent.toLowerCase())}>N</h3>
            <h3 onClick={(e) => move(e.target.textContent.toLowerCase())}>S</h3>
            <h3 onClick={(e) =>move(e.target.textContent.toLowerCase())}>E</h3>
            <h3 onClick={(e) => move(e.target.textContent.toLowerCase())}>W</h3>
            
            <div className="content">
                    <h2>{props.user.name}</h2>
                    <h3>{props.user.title}</h3>
                    <p className="desc">{props.user.description}</p>
            </div>
            
        </div>
    )
}

export default Game