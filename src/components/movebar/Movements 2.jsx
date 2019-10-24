import React from 'react'
import './Movements.scss'
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {faArrowAltCircleUp} from '@fortawesome/free-regular-svg-icons';
import {faArrowAltCircleDown} from '@fortawesome/free-regular-svg-icons';
import {faArrowAltCircleLeft} from '@fortawesome/free-regular-svg-icons';
import {faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons';
function MoveBar(props) {
    console.log();

    const arrows = document.querySelectorAll('.svg-inline--fa')
 
    console.log(arrows.length)
    
    
   //
    for (let i=0; i < arrows.length; i++) {
        if (props.loading === true) {
            arrows[i].style.color = '#953302'
        } else {
            arrows[i].style.color = '#F95604'
        }
        arrows[i].addEventListener('mousedown',() => {
            if (props.loading === false) {
                arrows[i].style.transform = 'scale(.8)'
            } else {
                arrows[i].style.transform = 'scale(1)'
            }
                
        })
        window.addEventListener('mouseup', () => {
            arrows[i].style.transform = 'scale(1)'
        })   
    }

    
    
    
    
    
    return (
        <section className="movements">
            <section className="arrow-row">
                {console.log(props.loading)}
                <FontAwesomeIcon className="arrow" onClick={()=> {
                    if (props.loading === false) {
                        props.move('n') 
                        console.log('moved north')
                    }
                   
                }} icon={faArrowAltCircleUp} />

            </section>
            <section className="arrow-row__center">
                <FontAwesomeIcon className="arrow"  onClick={()=> {
                    if (props.loading === false) {
                        props.move('w') 
                        console.log('moved west')
                    }
                   
                }} icon={faArrowAltCircleLeft} />
                <FontAwesomeIcon className="arrow"  onClick={()=> {
                    if (props.loading === false) {
                        props.move('e') 
                        console.log('moved east')
                    }
                   
                }} icon={faArrowAltCircleRight} />
            </section>
            <section className="arrow-row">
            <FontAwesomeIcon className="arrow"  onClick={()=> {
                if (props.loading === false) {
                    props.move('s') 
                    console.log('moved south')
                }
               
            }} icon={faArrowAltCircleDown} />
            </section>
        </section>
    )
}

export default MoveBar
