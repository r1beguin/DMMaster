import React from 'react';

import './Battlemap.css'



class Battlemap extends React.Component{

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
                    <div className="activeItem">Battle Map</div>
    
                    
                </div> */}

               
            </div> 

        )
    }
}


export default Battlemap