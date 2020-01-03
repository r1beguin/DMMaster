import React from 'react';

import './DMScreen.css'

import Upload from './Upload'
import Draggable from './Draggable'
import InitiativeTracker from './InitiativeTracker'

class DMScreen extends React.Component{

    constructor() {
        super();
        this.handler = this.handler.bind(this);
        this.endTurn=this.endTurn.bind(this);

        this.state={
            players:[{
                    "num":1,
                    "active":"yes",
                    "name":"Thokk", 
                    "src":'https://media-waterdeep.cursecdn.com/avatars/thumbnails/8081/329/150/150/637122084373232882.jpeg'
                },
                {
                    "num":2,
                    "active":"no",
                    "name":"Keran",
                    "src":'https://media-waterdeep.cursecdn.com/avatars/thumbnails/17/366/60/60/636377877759190874.jpeg'
                }],
            CurrentInitiative: 0,
            maxPlayer:2
      }
    }

      handler(e){ 
        this.props.modeSelection(e);
      }

      endTurn(){



        // this.setState(State => ({
        //     itemList: State.players.map(
        //     obj => (obj.active === "yes" ? Object.assign(obj, { active: "no" }) : obj)
        //   )
        // }));

        var stateCopy = Object.assign({}, this.state);
        stateCopy.players = stateCopy.players.slice();
        
        stateCopy.players[this.state.CurrentInitiative].active="no"
        if (this.state.CurrentInitiative===this.state.maxPlayer-1){
            stateCopy.players[0].active="yes"
            stateCopy.CurrentInitiative =0
            
        }else{
            
            
            stateCopy.CurrentInitiative += 1
            stateCopy.players[stateCopy.CurrentInitiative].active="yes"
            
            
        }

        this.setState(stateCopy);
        console.log(this.state.CurrentInitiative)
        
      }

      
 
    render(){
        
        return(
            <div>
                <div className="navDM">
                    <div className="back" onClick={() => this.handler("home")}>Home</div>
                    <div className="activeItem">DM Screen</div>
    
                </div>
                
                <div className="dmBox">
                    
                    <div className="iniBox">
                        
                        {this.state.players.map(function(d, idx){
                            return (<Draggable><a key={idx}><InitiativeTracker active={d.active} name={d.name} src={d.src} /></a></Draggable>)
                        })}
                        <div className="turnbox" >
                            <button className="turn" onClick={this.endTurn} >End of Turn</button>
                        </div>
                    </div>

                    <Upload />

                </div>
                
            </div> 

        )
    }
}


export default DMScreen