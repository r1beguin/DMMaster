import React, { Component } from 'react'

import './InitiativeTracker.css'

class InitiativeTracker extends Component{

    

    render(){

        const active ={
            border: "solid red", 
            
        }

        if (this.props.active==="yes"){

        return(
            <div className="box">
                <img alt="portrait" src={this.props.src} style={active} />
                <div className="characterName">
                    {this.props.name}
                </div>
            </div>
        )
        }else{
            return(
            <div className="box">
                <img alt="portrait" src={this.props.src} />
                <div className="characterName">
                    {this.props.name}
                </div>
            </div>
            )
        }

    }
}


export default InitiativeTracker