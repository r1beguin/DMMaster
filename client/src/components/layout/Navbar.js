import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/auth";

import {Box, Header, Image, Text} from "grommet";

import store from "../../store";
import connect from "react-redux/lib/connect/connect";
import CreatureToken from "../common/CreatureToken";

// import DMScreen from './../DMScreen/DMScreen'
// import Battlemap from './../BattleMap/Battlemap'
// import PlayerScreen from './../PlayerScreen/PlayerScreen'

// TODO: make it react to active screen
const Navbar = ({isAuthenticated, user}) => {
  const logout = () => {
    store.dispatch(logoutUser());
    console.log("logout");
  };

  return (
      <Header background="brand" elevation="medium" pad={{vertical: "small", horizontal: "medium"}}>
        <Link to="/" className="home">
          <Box alignContent="center">
              <Text size="xlarge" weight="bold">DMMaster</Text>
          </Box>
        </Link>
          <Box height="xxsmall" justify="center">
              {!isAuthenticated && <Link to="/login"><Text weight="bold">Login</Text></Link>}
          {isAuthenticated && <Box onClick={logout}>
              {user && <Box direction="row" gap="small" align="center">
                  <CreatureToken image="https://media-waterdeep.cursecdn.com/avatars/thumbnails/7519/581/219/150/637073581239053858.png" />
                  <Box>
                      <Text weight="bold">{user.name}</Text>
                  </Box>
              </Box>}
              {!user && "Logout"}
          </Box>
          }
      </Box>
      </Header>
  );
};

export default connect(
    state => ({
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user
    })
)(Navbar);

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
