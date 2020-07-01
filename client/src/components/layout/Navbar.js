import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/auth";

import {Anchor, Box, Header, Image, Text} from "grommet";

import store from "../../store";
import connect from "react-redux/lib/connect/connect";
import CreatureToken from "../common/CreatureToken";
import {GetNested} from "../../utils/DMMasterUtils";
import Login from "../auth/Login";
import {SHOW_LOGIN_MODAL} from "../../actions/types";

// import DMScreen from './../DMScreen/DMScreen'
// import Battlemap from './../BattleMap/Battlemap'
// import PlayerScreen from './../PlayerScreen/PlayerScreen'
import master from "../../images/master.svg";

// TODO: make it react to active screen
const Navbar = ({isAuthenticated, user, dispatch}) => {
  const logout = () => {
    store.dispatch(logoutUser());
    console.log("logout");
  };

  const userIcon = GetNested(user, 'creature', 'avatar');

  return (
      <Header background="brand" elevation="small" pad={{vertical: "small", horizontal: "medium"}} style={{zIndex: "5"}}>
        <Link to="/" className="home">
          <Box alignContent="center">
              <Text size="xlarge" weight="bold">DMMaster</Text>
          </Box>
        </Link>
          <Box height="xxsmall" justify="center">
              {!isAuthenticated && <Anchor onClick={()=>{console.log("test"); dispatch({type: SHOW_LOGIN_MODAL})}}><Text weight="bold">Login</Text></Anchor>}
          {isAuthenticated && <Box onClick={logout}>
              {user && <Box direction="row" gap="small" align="center">
                  { userIcon && <CreatureToken image={userIcon} size="xxsmall"/>}
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
