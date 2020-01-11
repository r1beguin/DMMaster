import React, { Component } from 'react'

import './InitiativeTracker.css'

class InitiativeTracker extends Component{

    constructor(){
        super()

        this.state={
            width:'50'
        }
    }
    componentDidMount() {
        this.setState({ width: this.props.imgWidth });  
      }

    render(){

        const active ={
            border: "solid red", 
            width:this.state.width
        }

        const notActive={
            width:this.state.width
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
                <img alt="portrait" src={this.props.src} style={notActive}/>
                <div className="characterName">
                    {this.props.name}
                </div>
            </div>
            )
        }

    }
}


export default InitiativeTracker