import React, { Component } from 'react'

import './InitiativeTracker.css'

class InitiativeTracker extends Component{
    render(){
        const active ={
            border: "solid red", 
        }
        
        return(
            <div className="box">
                <img alt="portrait" src={this.props.src} style={this.props.active ? active : null} />
                <div className="characterName">
                    {this.props.name}
                </div>
            </div>
        )
    }
}

export default InitiativeTracker