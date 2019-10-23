import React from 'react'
import './Movements.scss'
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {faArrowAltCircleUp} from '@fortawesome/free-regular-svg-icons';
import {faArrowAltCircleDown} from '@fortawesome/free-regular-svg-icons';
import {faArrowAltCircleLeft} from '@fortawesome/free-regular-svg-icons';
import {faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons';
function MoveBar(props) {
    console.log();


    return (
        <section className="movements">
            <section className="arrow-row">
        
                <FontAwesomeIcon className="arrow" onClick={()=>props.move('n') } icon={faArrowAltCircleUp} />

            </section>
            <section className="arrow-row__center">
                <FontAwesomeIcon className="arrow"  onClick={()=>props.move('w')} icon={faArrowAltCircleLeft} />
                <FontAwesomeIcon className="arrow"  onClick={()=>props.move('e')} icon={faArrowAltCircleRight} />
            </section>
            <section className="arrow-row">
            <FontAwesomeIcon className="arrow"  onClick={()=>props.move('s')} icon={faArrowAltCircleDown} />
            </section>
        </section>
    )
}

export default MoveBar
