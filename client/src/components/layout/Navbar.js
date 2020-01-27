import React from 'react';
import { Link } from 'react-router-dom';
import {logoutUser} from '../../actions/auth'

import './Navbar.css';
import store from '../../store';

// import DMScreen from './../DMScreen/DMScreen'
// import Battlemap from './../BattleMap/Battlemap'
// import PlayerScreen from './../PlayerScreen/PlayerScreen'

// TODO: make it react to active screen
const Navbar = () => {
    const onchange = () => {
        store.dispatch(logoutUser());
        console.log("logout");
        
    }
    
    return(
        <nav className="navbar bg-dark">
            <div>
                <Link to="/" className="home">DMMaster</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
                <div onClick={onchange} className="logout">
                
                    Logout
                
                </div>
            </div>
            
        </nav>
    )
    }


export default Navbar
 
// class Navbar extends React.Component {

//     constructor(){
//         super()

//         var init = localStorage.getItem('mode')
        
        
//         this.state = {
//             mode:init
//         }
    
//        this.modeSelection= this.modeSelection.bind(this)
       

//     }

    
    
//     setSelectedOption( option ) {
//         localStorage.setItem( 'mode', option );
//         this.setState( { mode: option } );
//     }

//     modeSelection(modeSelected){
        
//         this.setSelectedOption(modeSelected)
//         console.log("mode : " + this.state.mode)
//     }

//   render() {

//     if (localStorage.getItem('mode') === "home"){
//         return (
//         <div className="topnav">
//             <div onClick={()=>this.modeSelection("DM")}>DM Screen</div>
//             <div onClick={()=>this.modeSelection("BM")}>Battle Map</div>
//             <div onClick={()=>this.modeSelection("PS")}>Player Screen</div>
//         </div>
//         );
//     }else if (localStorage.getItem('mode')==="DM"){
//         return(
//             <DMScreen modeSelection={this.modeSelection} />
//         )
//     }else if (localStorage.getItem('mode')==="BM"){

//         return(
//             <Battlemap modeSelection={this.modeSelection} />
//         )
//     }else if (localStorage.getItem('mode')==="PS"){

//         return(
//             <PlayerScreen modeSelection={this.modeSelection} />
//         )
//     }
//         else{
//         return(
//             <div className="topnav">
//             <div onClick={()=>this.modeSelection("DM")}>DM Screen</div>
//             <div onClick={()=>this.modeSelection("BM")}>Battle Map</div>
//             <div onClick={()=>this.modeSelection("PS")}>Player Screen</div>
//         </div>
//         )
//     }
//   }
// }
 

