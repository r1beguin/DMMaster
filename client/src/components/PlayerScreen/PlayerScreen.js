import React from 'react';

import './PlayerScreen.css'
import StatPanel from './components/StatPanel/StatPanel'

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
                {/* <div className="navDM">
                    <div className="back" onClick={() => this.handler("home")}>Home</div>
                    <div className="activeItem">Player Screen</div>                    
                </div> */}

                <StatPanel />
            </div> 

        )
    }
}


export default PlayerScreen