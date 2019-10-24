import React from 'react'
import './Movements.scss'
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {faArrowAltCircleUp} from '@fortawesome/free-regular-svg-icons';
import {faArrowAltCircleDown} from '@fortawesome/free-regular-svg-icons';
import {faArrowAltCircleLeft} from '@fortawesome/free-regular-svg-icons';
import {faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons';
function MoveBar(props) {

    let arrows = document.querySelectorAll('.arrow')
    
    
    for (let i=0; i < arrows.length; i++) {
        if (props.loading === true ) {
            arrows[i].classList.toggle('disabled')
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
              
                {localStorage.getItem('north') === 'true' ?
                //if going north is true display active arrow, if false display disabled arrow
                //***  repeat for all arrows/
                <FontAwesomeIcon className="arrow" onClick={()=> {
                    if (props.loading === false && localStorage.getItem('north') === 'true') {
                        props.move('n') 
                        console.log('moved north')
                    } 
                   
                }} icon={faArrowAltCircleUp} /> : <FontAwesomeIcon className='disabled' icon={faArrowAltCircleUp} /> }

            </section>
            <section className="arrow-row__center">
                {localStorage.getItem('west') === 'true' ?
                <FontAwesomeIcon className="arrow"  onClick={()=> {
                    if (props.loading === false && localStorage.getItem('west') === 'true') {
                        props.move('w') 
                    }
                   
                }} icon={faArrowAltCircleLeft} />  : <FontAwesomeIcon className='disabled' icon={faArrowAltCircleLeft} />  }
                {localStorage.getItem('east') === 'true' ? 
                <FontAwesomeIcon className="arrow"  onClick={()=> {
                    if (props.loading === false && localStorage.getItem('east') === 'true') {
                        props.move('e') 
                    }
                   
                }} icon={faArrowAltCircleRight} /> : <FontAwesomeIcon className='disabled' icon={faArrowAltCircleRight} /> }
            </section>
            <section className="arrow-row">
            {localStorage.getItem('south') === 'true' ?
            <FontAwesomeIcon className="arrow"  onClick={()=> {
                if (props.loading === false && localStorage.getItem('south') === 'true') {
                    props.move('s') 
                } 
               
            }} icon={faArrowAltCircleDown} /> : <FontAwesomeIcon className='disabled' icon={faArrowAltCircleDown} /> }
            </section>
        </section>
    )
}

export default MoveBar
