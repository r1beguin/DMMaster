import React from 'react';

import './DMScreen.css'

import Upload from './components/Upload'
import Draggable from '../../utils/Draggable'
import InitiativeTracker from './components/InitiativeTracker'

class DMScreen extends React.Component{

    constructor() {
        super();
        this.handler = this.handler.bind(this);
        this.endTurn=this.endTurn.bind(this);
        this.addEnemy=this.addEnemy.bind(this);
        this.addAlly=this.addAlly.bind(this);
        this.setImgWidth=this.setImgWidth.bind(this)

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
            maxPlayer:2,
            imgWidth:50

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

      addEnemy(){
          this.setState({
              maxPlayer:this.state.maxPlayer +1
          })
          this.setState({
              players : this.state.players.concat({
                "num":this.state.maxPlayer,
                "active":"no",
                "name":"Enemy",
                "src":'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Skull-Icon.svg/400px-Skull-Icon.svg.png'})
          })
      }

      addAlly(){
        this.setState({
            maxPlayer:this.state.maxPlayer +1
        })
        this.setState({
            players : this.state.players.concat({
              "num":this.state.maxPlayer,
              "active":"no",
              "name":"Ally",
              "src":'https://banner2.cleanpng.com/20180405/osq/kisspng-login-google-account-computer-icons-user-activity-5ac6bbe6ecba00.2369522615229736709696.jpg'})
        })
    }

    setImgWidth(e){
        this.setState({
            imgWidth: e.target.value 
        })
        
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
                       
                        <input className="sizeSlider" type="range" min="0" max="100" step="1" value={this.state.imgWidth} onChange={this.setImgWidth} />
                        {this.state.players.map((d) => {
                            return (<Draggable><a><InitiativeTracker imgWidth={this.state.imgWidth} active={d.active} name={d.name} src={d.src} /></a></Draggable>)
                        })}
                        <div className="turnbox" >
                            <button className="turn" onClick={this.endTurn} >End of Turn</button>
                            <button className="turn" onClick={this.addEnemy} >Add enemi</button>
                            <button className="turn" onClick={this.addAlly} >Add ally</button>
                        </div>
                    </div>

                    <Upload />

                </div>
                
            </div> 

        )
    }
}


export default DMScreen