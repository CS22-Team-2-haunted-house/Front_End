import React, {useEffect, useState} from 'react'
import Char from '../charScreen/char_screen'
import status from '../../helpers/transfer'
import './Game.scss'
import Movebar from '../movebar/Movements'
import Map from '../Map/Map'
// import { props } from 'bluebird'

function Game({connection,setUser,logout,user}) {
    let [north, setNorth] = useState(true);
    let [south, setSouth] = useState(true);
    let [east, setEast] = useState(true);
    let [west, setWest] = useState(true);
    const [loading, setLoading] = useState(false);
    let [rooms,setRooms] = useState([])
    
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

    //initial load
    useEffect(()=>{
        let grabber = async ()=>{
            try {
                let req = await connection.get('/api/adv/rooms/')
                let data = await req.data
                setRooms(JSON.parse(data.rooms))
            } catch (error) {
                console.error({...error});
            }
        }
        if(rooms.length==0){
            grabber()
        }
    },[rooms])


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

    ////////  disabling individual arrows if direction is not available // //////

    // filter through rooms and grab the one that === the title and description of the user's position
    let current = rooms.filter(room => room.fields.title === user.title && room.fields.description === user.description)
    
    // it is set inside an object and is the only element, set it to current[0] for convenience 
    current = current[0]

    
    // "current && " <--- needed because current is loaded in useEffect
    ///content is inside "fields" object
    if (current && current.fields.n_to === 0) { //if current room's 'n_to' points to 0, it is unavailable
           // using local storage as using a state cause an infinite loop
            localStorage.setItem('north', 'false') // set storage of north to false
            
        /// repeat pattern below
        } else {
          
            localStorage.setItem('north', 'true')
        }
    
        if (current && current.fields.s_to === 0) {
            localStorage.setItem('south', 'false')
        } else {
            localStorage.setItem('south', 'true')
        }
    
        if (current && current.fields.e_to === 0) {
            localStorage.setItem('east', 'false')
        } else {
            localStorage.setItem('east', 'true')
        }
    
        if (current && current.fields.w_to === 0) {
            localStorage.setItem('west', 'false')
        } else {
            localStorage.setItem('west', 'true')
        }

    return (
        <div className="game">
            <p>Haunted House</p>
            <Map connection={connection} user={user} rooms={rooms}/>
          
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
                <Movebar move={move} loading={loading} rooms={rooms} />
            </div>
         
        </div>
    )
}

export default Game