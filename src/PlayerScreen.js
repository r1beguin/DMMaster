import React from 'react';

import './PlayerScreen.css'

import Upload from './Upload'

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
            </div> 

        )
    }
}


export default PlayerScreen