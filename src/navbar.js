import React from 'react';

import './Navbar.css';

import DMScreen from './DMScreen'


 
class Navbar extends React.Component {

    constructor(){
        super()

        var init = localStorage.getItem('mode')
        
        
        this.state = {
            mode:init
        }
    
       this.modeSelection= this.modeSelection.bind(this)
       

    }

    
    
    setSelectedOption( option ) {
        localStorage.setItem( 'mode', option );
        this.setState( { mode: option } );
    }

    modeSelection(modeSelected){
        
        this.setSelectedOption(modeSelected)
        console.log("mode : " + this.state.mode)
    }

  render() {

    if (localStorage.getItem('mode') === "home"){
        return (
        <div className="topnav">
            <div onClick={()=>this.modeSelection("DM")}>DM Screen</div>
            <div onClick={()=>this.modeSelection("BM")}>Battle Map</div>
            <div onClick={()=>this.modeSelection("PS")}>Player Screen</div>
        </div>
        );
    }else if (localStorage.getItem('mode')==="DM"){
        return(
            <DMScreen modeSelection={this.modeSelection} />
        )
    }
  }
}
 

export default Navbar