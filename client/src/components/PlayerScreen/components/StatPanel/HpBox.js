import React, { Component } from 'react'

import './HpBox.css'
import HpManager from '../HpManager'

//Hit points display managment 

class HpBox extends Component{
    constructor(){
        super()

        this.state = {
            
            hp:30,
            maxHp:50,
           
            userInput:0
        }

        this.userInput =this.userInput.bind(this)
        this.addHP =this.addHP.bind(this)
        this.remHP =this.remHP.bind(this)
    }

    addHP(){
        var newHp=this.state.hp+parseInt(this.state.userInput,10)
        if(newHp>this.state.maxHp){
            this.setState({
                hp:this.state.maxHp
            })
        }else{
            this.setState({
                hp:newHp
            })
        }
    }

    remHP(){
        var newHp=this.state.hp-parseInt(this.state.userInput,10)
        if(newHp<0){
            this.setState({
                hp:0
            })
        }else{
            this.setState({
                hp:newHp
            })
        }
    }

    userInput(e){
        this.setState({
            userInput:e.target.value
        })
    }

    render(){
        return(

            <div className="Box">

                <h4>
                    Hit points
                </h4>

                <div className="currentHp"><HpManager /></div>
                <hr />
                <div className="maxHp">{this.state.maxHp}</div>



                <div className="modifyHp">
                    <button onClick={this.remHP}>-</button>
                    <input onChange={this.userInput}/>
                    <button onClick={this.addHP}>+</button>   
                </div>

            </div>


        )
    }



}

export default HpBox