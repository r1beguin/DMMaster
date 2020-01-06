import React, { Component } from 'react'

import './StatPanel.css'

import HpBox from './HpBox'

import MainStatBox from './MainStatBox'

//Describes base player stats and modifiers 

class StatPanel extends Component{
  
    render(){
        return(
            <div className="StatPanel">

                <HpBox />

                <div className="ACIniBox">
                    <div className="ACBox">
                        <h4>
                            AC
                        </h4>
                        <hr />
                        15
                    </div>

                    <div className="IniBox">
                        <h4>
                            Initiative
                        </h4>
                        <hr />
                        +2
                    </div>
                </div>
                

                <MainStatBox />

            </div>
        )
    }
}


export default StatPanel