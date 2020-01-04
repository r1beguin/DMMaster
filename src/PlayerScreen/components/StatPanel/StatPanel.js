import React, { Component } from 'react'

import './StatPanel.css'

import './HpBox'
import HpBox from './HpBox'

//Describes base player stats and modifiers 

class StatPanel extends Component{
  
    render(){
        return(
            <div className="StatPanel">

                <HpBox />

            </div>
        )
    }
}


export default StatPanel