import React, {useEffect} from 'react'
import Char from '../charScreen/char_screen'
import status from '../../helpers/transfer'
import './Game.scss'
import Movebar from '../movebar/Movements'
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

    useEffect(() => {
       const init= async e=>{
            try {
                let request = await props.connection.get('/api/adv/init/')
                let data = request.data
                props.setUser({...data})
                console.log({...data})
            } catch (error) {
                return status(false,error.response.data)
            }
        }
        init()
    },[])

    

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
            <p>Haunted House</p>
            <div className="map">
            
            </div>
          
            <div className="content-container">
                <div className="content">
                    <button className="logoutBtn" onClick={props.logout}>
                         logout
                    </button>
                    <h2>{props.user.name}</h2>
                    <h3>{props.user.title}</h3>
                    <p className="desc">{props.user.description}</p>
                    <p className="err">{props.user.error_msg}</p>
                </div>
                <Movebar move={move}/>
            </div>
         
        </div>
    )
}

export default Game