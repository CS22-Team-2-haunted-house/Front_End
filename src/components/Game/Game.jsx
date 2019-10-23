import React, {useEffect, useState} from 'react'
import Char from '../charScreen/char_screen'
import status from '../../helpers/transfer'
import './Game.scss'
import Movebar from '../movebar/Movements'
import Map from '../Map/Map'
import { props } from 'bluebird'

function Game({connection,setUser,logout,user}) {
    const [loading, setLoading] = useState(false);
    let [north, setNorth] = useState(false);
    let [south, setSouth] = useState(false);
    let [east, setEast] = useState(false);
    let [west, setWest] = useState(false);
    const getData=async (e)=>{
        try {
            let request = await connection.get('/api/adv/init/')
            let data = await request.data 
            setUser({...data})
        } catch (error) {
            return new status(false,error.response.data)
        }
    }

    useEffect(() => {
       const init= async e=>{
            try {
                let request = await connection.get('/api/adv/init/')
                let data = request.data
                setUser({...data})
            } catch (error) {
                logout()
            }
        }
        init()
    },[connection,setUser])

   

    

    const move=async e=>{
        try {
            setLoading(true)
            // console.log('hello')
            let request = await connection.post('/api/adv/move',{direction: e})
            let data = request.data
            setUser({...data})
            setLoading(false)
            // console.log(loading)
           
        } catch (error) {
            
        }
    }

    return (
        <div className="game">
            <p>Haunted House</p>
            <Map connection={connection} user={user} north={north} />
          
            <div className="content-container">
                <div className="content">
                    <button className="logoutBtn" onClick={logout}>
                         logout
                    </button>
                    <h2>{user.name}</h2>
                    <h3>{user.title}</h3>
                    <p className="desc">{user.description}</p>
                    <p className="err">{user.error_msg}</p>
                </div>
                <Movebar move={move} loading={loading}/>
            </div>
         
        </div>
    )
}

export default Game