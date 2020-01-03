import React from 'react';

import './PlayerScreen.css'

import Upload from './Upload'
import Draggable from './Draggable'

class PlayerScreen extends React.Component{

    constructor() {
        super();
        this.handler = this.handler.bind(this);
      }

      handler(e){ 
        this.props.modeSelection(e);
      }
 
    render(){
        return(
            <div>
                <div className="navDM">
                    <div className="back" onClick={() => this.handler("home")}>Home</div>
                    <div className="activeItem">Player Screen</div>
    
                    
                </div>

                <Upload />
                <Draggable>
                        <svg height="100" width="100">
                            <circle cx="50" cy="50" r="15" stroke="black" stroke-width="3" fill="red" />
                        </svg>
                </Draggable>
            </div> 

        )
    }
}


export default PlayerScreen