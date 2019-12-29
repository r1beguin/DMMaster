import React from 'react';

import './DMScreen.css'

import Upload from './Upload'

class DMScreen extends React.Component{

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
                    <div>DM Screen</div>
    
                    
                </div>

                <Upload />
            </div> 

        )
    }
}


export default DMScreen