import socketIOClient from "socket.io-client";
import { setTurn } from './actions/fight'
import { loadActiveImage } from './actions/image'
import { loadFight } from './actions/fight'


// here is all the receivers for socketio
// used to update the store
// TODO: add rooms / namespace for more clarity
module.exports = function(url, store) {

  const io = socketIOClient(url);
  console.log('socket connected');

  io.on('NEXT_TURN_IO', data => {
    console.log('socket received:', data);
    const { turn, round } = data;
    store.dispatch(setTurn(turn, round));
  });

  // Load new active map on a change notice
  io.on('CHANGE_MAP_IO', data => {
    // console.log('socket received:', data);
    store.dispatch(loadActiveImage());
  });

  io.on('CHANGE_CREATURE_IO', data => {
    // console.log('socket received:', data);
    store.dispatch(loadFight());
  });

  // io.on('NEW_FIGHT_IO', data => {
  //   console.log('received next turn:', data);
  //   const { turn, round } = data;
  //   store.dispatch(setTurn(turn, round));
  // });
}
