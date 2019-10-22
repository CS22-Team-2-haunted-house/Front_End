import React from 'react'

function MoveBar(props) {
    console.log();
    return (
        <section>
            <section>
                <button onClick={()=>props.move('w')}>
                    Move West
                </button>
            </section>
            <section>
                <button onClick={()=>props.move('n')}>
                    Move North
                </button>
                <button onClick={()=>props.move('s')}>
                    Move South
                </button>
            </section>
            <section>
                <button onClick={()=>props.move('e')}>
                    Move East
                </button>
            </section>
        </section>
    )
}

export default MoveBar
