import React,{useEffect, useRef} from 'react'
import none from '../../images/0.png'
import top from '../../images/1.png'
import right from '../../images/2.png'
import rightTop from '../../images/3.png'
import bottom from '../../images/4.png'
import bottomTop from '../../images/5.png'
import bottomRight from '../../images/6.png';
import fromLeftOnly from '../../images/7.png'
import left from '../../images/8.png'
import leftTop from '../../images/9.png'
import leftRight from '../../images/10.png'
import bottomOnly from '../../images/11.png'
import leftBottom from '../../images/12.png'
import rightOnly from '../../images/13.png'
import topOnly from '../../images/14.png'


function Map({connection}) {
    let images = [none,top,right,rightTop,bottom,bottomTop,bottomRight,fromLeftOnly,left,leftTop,leftRight,bottomOnly,leftBottom,rightOnly,topOnly]
    let preload = []
    let rooms = []
    let canvas = useRef(null)
    let ctx = null
    
    useEffect(()=>{
        if(preload.length==0){
            images.forEach(img=>{
                let temp = new Image()
                temp.src=img
                preload.push(temp)
            })
        }
        let grabber = async ()=>{
            try {
                let req = await connection.get('/api/adv/rooms/')
                let data = await req.data
                console.log(JSON.parse(data.rooms));
            } catch (error) {
                console.error({...error});
            }
        }
        if(rooms.length==0){
            grabber()
        }
    },[preload,images,rooms])

    useEffect(()=>{
        if (ctx==null && canvas.current!=null) {
            ctx = canvas.getContext('2d')
        }
    })

    return (
        <div className="map">
            <canvas ref={canvas} />
        </div>
    )
}

export default Map
