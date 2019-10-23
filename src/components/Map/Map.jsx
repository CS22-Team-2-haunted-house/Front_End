import React,{useEffect, useRef, useState,useReducer} from 'react'
import none from '../../images/0.jpg'
import top from '../../images/1.jpg'
import right from '../../images/2.jpg'
import rightTop from '../../images/3.jpg'
import bottom from '../../images/4.jpg'
import bottomTop from '../../images/5.jpg'
import bottomRight from '../../images/6.jpg';
import fromLeftOnly from '../../images/7.jpg'
import left from '../../images/8.jpg'
import leftTop from '../../images/9.jpg'
import leftRight from '../../images/10.jpg'
import bottomOnly from '../../images/11.jpg'
import leftBottom from '../../images/12.jpg'
import rightOnly from '../../images/13.jpg'
import topOnly from '../../images/14.jpg'
import './Map.scss'
const IMAGE_SIZE=128


function Map({connection}) {
    
    let [rooms,setRooms] = useState([])
    let canvas = useRef(null)
    let [ctx,setCtx]=useState(null)
    let map = useRef(null)
    const [images,setImages]=useState([])

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
    },[])

    //set context when it's ready
    useEffect(()=>{
        if (ctx==null && canvas.current!=null) {
            setCtx(canvas.current.getContext('2d'))
            setImages(Array.from(map.current.querySelectorAll('img')))
        }
    },[canvas,ctx])

    //make map when ready
    useEffect(()=>{
        if (ctx!=null && rooms.length>0) {
            //data for aquisition
            let compX=map.current.clientWidth
            let compY=map.current.clientHeight

            let maxY=compY*(compY/map.current.offsetHeight)
            let maxX=compX*(compX/map.current.offsetWidth)

            canvas.current.height=compY*(compY/map.current.offsetHeight)
            canvas.current.width=compX*(compX/map.current.offsetWidth)

            let startX = Math.round(maxX/2)
            let startY = Math.round(maxY-IMAGE_SIZE)

            let Offset = IMAGE_SIZE/2

            startX-=Offset

            let order=[{room:rooms[0],x:startX,y:startY}]
            let done=[]



            while (order.length>0) {
                let curr=order.pop()
                done.push(curr.room.pk)
                
                let opts = curr.room.fields

                let walls=15
                
                if(opts.n_to>0){
                    walls-=1
                    
                    if (done.includes(opts.n_to)==false) {
                        let room = rooms.find(item=>item.pk==opts.n_to)
                        
                        order.push({
                            room,
                            x:curr.x,
                            y:curr.y-IMAGE_SIZE
                        })

                    }
                }
                if (opts.e_to>0) {
                    walls-=2
                    
                    if (done.includes(opts.e_to)==false) {
                        let room = rooms.find(item=>item.pk==opts.e_to)
                        
                        order.push({
                            room,
                            x:curr.x+IMAGE_SIZE,
                            y:curr.y
                        })

                    }
                }
                if (opts.s_to>0) {
                    walls-=4
                    
                    if (done.includes(opts.s_to)==false) {
                        let room = rooms.find(item=>item.pk==opts.s_to)
                        
                        order.push({
                            room,
                            x:curr.x,
                            y:curr.y-IMAGE_SIZE
                        })

                    }
                }
                if (opts.w_to>0) {
                    walls-=8
                    
                    if (done.includes(opts.w_to)==false) {
                        let room = rooms.find(item=>item.pk==opts.w_to)
                        
                        order.push({
                            room,
                            x:curr.x-IMAGE_SIZE,
                            y:curr.y
                        })

                    }
                }
                ctx.drawImage(images[walls],curr.x,curr.y)
            }
        }else{
            
        }
    },[rooms,ctx])

    return (
        <div className="map" ref={map}>
            <canvas ref={canvas}/>
            <img src={none} className="loaded" alt=""/>
            <img src={top} className="loaded" alt=""/>
            <img src={right} className="loaded" alt=""/>
            <img src={rightTop} className="loaded" alt=""/> 
            <img src={bottom} className="loaded" alt=""/>
            <img src={bottomTop} className="loaded" alt=""/>
            <img src={bottomRight} className="loaded" alt=""/>
            <img src={fromLeftOnly} className="loaded" alt=""/>
            <img src={left} className="loaded" alt=""/>
            <img src={leftTop} className="loaded" alt=""/>
            <img src={leftRight} className="loaded" alt=""/>
            <img src={bottomOnly} className="loaded" alt=""/>
            <img src={leftBottom} className="loaded" alt=""/>
            <img src={rightOnly} className="loaded" alt=""/>
            <img src={topOnly} className="loaded" alt=""/>
        </div>
    )
}

export default Map
