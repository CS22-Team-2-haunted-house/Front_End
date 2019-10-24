import React,{useEffect, useRef, useState} from 'react'
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
import sprite from '../../images/char.png'
import './Map.scss'
const   IMAGE_SIZE=128
const   SPRITE_HEIGHT=64,
        SPRITE_WIDTH=40,
        LOWER_TILE_SHEET=null,
        UPPER_TILE_SHEET=null,
        SPRITE_SHEET=null


function Map({user,rooms}) {
    
    let canvas = useRef(null)
    let [ctx,setCtx]=useState(null)
    let map = useRef(null)
    const [images,setImages]=useState([])
    const userArt=useRef(null)
    
    //set context when it's ready
    useEffect(()=>{
        if (ctx==null && canvas.current!=null) {
            setCtx(canvas.current.getContext('2d'))
            setImages(Array.from(map.current.querySelectorAll('img')))
        }
    },[canvas,ctx])
    
    //make map when ready
    useEffect(()=>{
        if (ctx!=null && rooms.length>0 && 'title' in user) {

            //data for aquisition
            let compX=map.current.clientWidth
            let compY=map.current.clientHeight

            let maxY=compY*(compY/map.current.offsetHeight)
            let maxX=compX*(compX/map.current.offsetWidth)

            canvas.current.height=compY*(compY/map.current.offsetHeight)
            canvas.current.width=compX*(compX/map.current.offsetWidth)

            let startX = Math.floor(maxX/2)
            let startY = Math.round(maxY/2)

            let Offset = IMAGE_SIZE/2

            startX-=Offset
            startY-=Offset
            let order=[{room:rooms.find(room=>room.title==user.title),x:startX,y:startY}]
            let done=[]

            while (order.length>0) {
                let curr=order.pop()
                done.push(curr.room.id)
                
                let opts = curr.room

                let walls=15
                if(opts.n_to>0){
                    walls-=1
                    
                    if (done.includes(opts.n_to)==false) {
                        let room = rooms.find(item=>item.id==opts.n_to)
                        
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
                        let room = rooms.find(item=>item.id==opts.e_to)
                        
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
                        let room = rooms.find(item=>item.id==opts.s_to)
                        
                        order.push({
                            room,
                            x:curr.x,
                            y:curr.y+IMAGE_SIZE
                        })

                    }
                }
                if (opts.w_to>0) {
                    walls-=8
                    
                    if (done.includes(opts.w_to)==false) {
                        let room = rooms.find(item=>item.id==opts.w_to)
                        
                        order.push({
                            room,
                            x:curr.x-IMAGE_SIZE,
                            y:curr.y
                        })

                    }
                }
                console.log(`drawing ${walls} at ${curr.x},${curr.y}`);
                ctx.drawImage(images[walls],curr.x,curr.y)

                if (opts.below) {
                    opts.below.forEach(item=>{
                        ctx.drawImage(LOWER_TILE_SHEET,
                            item.sheet.x, item.sheet.y, item.sheet.w, item.sheet.h,
                            item.loc.x, item.loc.y, item.loc.w, item.loc.h
                        )
                    })
                }

                if (opts.title==user.title) {
                    let userposx=curr.x+Offset-(SPRITE_WIDTH/2),
                        userposy=curr.y+Offset-(SPRITE_HEIGHT/2)
                    ctx.drawImage(userArt.current,userposx,userposy)
                }else{
                }

                if (opts.top) {
                    opts.top.forEach(item=>{
                        ctx.drawImage(UPPER_TILE_SHEET,
                            item.sheet.x, item.sheet.y, item.sheet.w, item.sheet.h,
                            item.loc.x, item.loc.y, item.loc.w, item.loc.h
                        )
                    })
                }
            }
        }else{
            
        }
    },[rooms,ctx,user])
    
    // let current = rooms.filter(room => room.fields.title === user.title && room.fields.description === user.description)
    // console.log(current[0])
    // current = current[0]
    // console.log(current && current.fields.n_to)
    // if (current && current.fields.n_to === 0) {
    //     setNorth(false)
    // } else {
    //     setNorth(true)
    // }

    // if (current && current.fields.s_to === 0) {
    //     setSouth(false)
    // } else {
    //     setSouth(true)
    // }

    // if (current && current.fields.e_to === 0) {
    //     setEast(false)
    // } else {
    //     setEast(true)
    // }

    // if (current && current.fields.w_to === 0) {
    //     setWest(false)
    // } else {
    //     setWest(true)
    // }

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
            <img src={none} className="loaded" alt=""/>
            <img src={sprite} alt="" className="loaded" ref={userArt} id="sprite"/>
        </div>
    )
}

export default Map
