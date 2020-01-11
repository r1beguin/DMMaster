import React, { Component } from 'react'

import './Skills.css'

class Skills extends Component{

    render(){

        if (this.props.skill==="0"){
            return(
                <div>
                    
                </div>
            )
        }else if (this.props.skill==="str"){
            return(
                <div className="Skill">
                    <p style={{fontWeight: 'bold'}}>
                        Athletics
                    </p>                 
                    +2
                </div>
            )

        }else if (this.props.skill==="dex"){
            return(
                <div className="Skill">
                    <p style={{fontWeight: 'bold'}}>
                        Acrobatics
                    </p>      
                    +2
                    <p style={{fontWeight: 'bold'}}>
                        Sleight of Hand
                    </p> 
                    +2
                    <p style={{fontWeight: 'bold'}}>
                        Stealth
                    </p>                    
                    +2
                </div>
            )

        }else if (this.props.skill==="int"){
            return(
                <div className="Skill">
                    <p style={{fontWeight: 'bold'}}>
                        Arcana
                    </p>                   
                    +2
                    <p style={{fontWeight: 'bold'}}>
                        History
                    </p>                   
                    +2
                    <p style={{fontWeight: 'bold'}}>
                        Investigation
                    </p>                   
                    +2
                    <p style={{fontWeight: 'bold'}}>
                        Nature
                    </p>                   
                    +2
                    <p style={{fontWeight: 'bold'}}>
                        Religion
                    </p>                   
                    +2
                </div>
            )

        }else if (this.props.skill==="wis"){
            return(
                <div className="Skill">
                    <p style={{fontWeight: 'bold'}}>
                        Animal handling
                    </p>                  
                    +2
                    <p style={{fontWeight: 'bold'}}>
                        Insight
                    </p>                  
                    +2
                    <p style={{fontWeight: 'bold'}}>
                        Medicine
                    </p>                   
                    +2
                    <p style={{fontWeight: 'bold'}}>
                        Perception
                    </p>                  
                    +2
                    <p style={{fontWeight: 'bold'}}>
                        Survival
                    </p>                  
                    +2
                </div>
            )

        }else if (this.props.skill==="cha"){
            return(
                <div className="Skill">
                    <p style={{fontWeight: 'bold'}}>
                        Deception
                    </p>                  
                    +2
                    <p style={{fontWeight: 'bold'}}>
                        Intimidation
                    </p>                  
                    +2
                    <p style={{fontWeight: 'bold'}}>
                        Performance
                    </p>                   
                    +2
                    <p style={{fontWeight: 'bold'}}>
                        Persuasion
                    </p>                  
                    +2
                </div>
            )

        }else{
            return(
                <div></div>
            )
        }
    }
}

export default Skills