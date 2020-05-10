import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/auth";

import { Nav, Box } from "grommet";

import "./Navbar.css";
import store from "../../store";

// import DMScreen from './../DMScreen/DMScreen'
// import Battlemap from './../BattleMap/Battlemap'
// import PlayerScreen from './../PlayerScreen/PlayerScreen'

// TODO: make it react to active screen
const Navbar = () => {
  const onchange = () => {
    store.dispatch(logoutUser());
    console.log("logout");
  };

  return (
    <Nav
      direction="row"
      background="dark-1"
      gap="small"
      justify="between"
      pad="small"
      alignContent="center"
      margin={{ bottom: "small" }}
    >
      <Box alignContent="center">
        <Link to="/" className="home">
          DMMaster
        </Link>
      </Box>
      <Box>
        <Link to="/login">Login</Link>
        <Box onClick={onchange}>Logout</Box>
      </Box>
    </Nav>
  );
};

export default Navbar;

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
