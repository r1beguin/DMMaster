import React from 'react'
import { Component } from 'react'

import './MainStatBox.css'

import Skills from './Skills'

class MainStatBox extends Component{
    constructor(){
        super()
        this.state={
            str:"+2",
            dex:"+2",
            con:"+2",
            int:"+2",
            wis:"+2",
            cha:"+2",
            skill:""
        }
    }

    SkillDisplay(e){
        if (e==="str" && this.state.skill!=="str"){
            this.setState({skill:"str"})
        }else if (e==="dex" && this.state.skill!=="dex"){
            this.setState({skill:"dex"})
        }else if (e==="int" && this.state.skill!=="int"){
            this.setState({skill:"int"})
        }else if (e==="wis" && this.state.skill!=="wis"){
            this.setState({skill:"wis"})
        }else if (e==="cha" && this.state.skill!=="cha"){
            this.setState({skill:"cha"})
        }else{
            this.setState({skill:"0"})
        }

    }

    render(){
        return(
            
                <div className="MainStatBox">
                    <div className="MainStat" onClick={()=>this.SkillDisplay("str")}>
                        <p style={{fontWeight: 'bold'}}>
                            Strength
                        </p>
                        <hr />
                        {this.state.str}
                    </div>

                    <div className="MainStat" onClick={()=>this.SkillDisplay("dex")}>
                        <p style={{fontWeight: 'bold'}}>
                            Dexterity
                        </p>
                        <hr />
                        {this.state.dex}
                    </div>

                    <div className="MainStat">
                        <p style={{fontWeight: 'bold'}}>
                            Constitution
                        </p>
                        <hr />
                        {this.state.con}
                    </div>

                    <div className="MainStat" onClick={()=>this.SkillDisplay("int")}>
                        <p style={{fontWeight: 'bold'}}>
                            Intelligence
                        </p>
                        <hr />
                        {this.state.int}
                    </div>

                    <div className="MainStat" onClick={()=>this.SkillDisplay("wis")}>
                        <p style={{fontWeight: 'bold'}}>
                            Wisdom
                        </p>
                        <hr />
                        {this.state.wis}
                    </div>

                    <div className="MainStat" onClick={()=>this.SkillDisplay("cha")}>
                        <p style={{fontWeight: 'bold'}}>
                            Charisma
                        </p>
                        <hr />
                        {this.state.cha}
                    </div>

                    <div>
                        <Skills skill={this.state.skill} />
                    </div>

                </div>

                
            
        )
    }
}

export default MainStatBox